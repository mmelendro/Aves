"""Rebuild public factual bird metadata from the official OSNZ 2024 workbook.

Usage: python scripts/import-nz-checklist.py INPUT.xlsx OUTPUT.json [OUTPUT2.json]
The workbook is downloaded separately from the dataUrl in the existing JSON.
This script has no network, credentials or customer-data access. It reads XLSX
with Python's standard library; no spreadsheet-authoring dependency is needed.
Changing reference edition/counts requires a reviewed import and matching tests.
"""
import hashlib
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile


def main():
    workbook, *outputs = sys.argv[1:]
    if not outputs:
        raise SystemExit(__doc__)
    ns = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    with ZipFile(workbook) as archive:
        strings = ["".join(item.itertext()) for item in ET.fromstring(archive.read("xl/sharedStrings.xml")).findall("s:si", ns)]
        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
    birds = []
    for row in sheet.findall("s:sheetData/s:row", ns):
        cells = {}
        for cell in row.findall("s:c", ns):
            value = cell.find("s:v", ns)
            text = value.text if value is not None else ""
            if cell.get("t") == "s" and text:
                text = strings[int(text)]
            column = "".join(char for char in cell.get("r") if char.isalpha())
            cells[column] = text
        # Species only: do not duplicate subspecies, hybrids or appendices.
        if cells.get("K") != "Species" or cells.get("L") != "Main text":
            continue
        scientific = " ".join(cells["B"].split())
        english = cells["G"].strip()
        maori = cells.get("H", "").split("|")[0].strip().rstrip("*")
        if maori.casefold() == english.casefold():
            maori = ""
        birds.append({
            "id": "nz-" + hashlib.sha256(scientific.encode()).hexdigest()[:12],
            "commonName": english, "maoriName": maori,
            "scientificName": scientific, "family": cells["J"].strip(),
            "origin": cells["M"].strip(), "status": cells["N"].strip(),
            "rare": cells.get("O") == "Vagrant", "extinct": cells["N"] == "Extinct",
        })
    assert len(birds) == len({bird["scientificName"] for bird in birds}) == 432
    assert sum(not bird["extinct"] for bird in birds) == 377
    source = json.loads(Path(outputs[0]).read_text(encoding="utf-8"))["source"]
    data = json.dumps({"source": source, "species": birds}, ensure_ascii=False, separators=(",", ":")) + "\n"
    for output in outputs:
        Path(output).write_text(data, encoding="utf-8", newline="\n")
    print("Imported all 432 main-list species: 377 living, 55 historical extinct.")


if __name__ == "__main__":
    main()
