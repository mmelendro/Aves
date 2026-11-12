#!/usr/bin/env python3
"""Build public factual references from cached, attributed national sources.

No observation API, coordinates, media downloads or silent taxonomy merges.
Run with a Python environment containing pdfplumber for the Australian PDF.
"""
import argparse
import csv
import hashlib
import io
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
REVIEWED = '2026-11-13'


def workbook_rows(path, sheet=1):
    with ZipFile(path) as archive:
        shared = []
        if 'xl/sharedStrings.xml' in archive.namelist():
            shared = [''.join(t.itertext()) for t in ET.fromstring(archive.read('xl/sharedStrings.xml')).findall('m:si', NS)]
        result = []
        for row in ET.fromstring(archive.read(f'xl/worksheets/sheet{sheet}.xml')).findall('.//m:row', NS):
            cells = {}
            for cell in row.findall('m:c', NS):
                col = re.sub(r'\d+', '', cell.attrib['r'])
                value = cell.find('m:v', NS)
                text = value.text if value is not None else ''
                if cell.attrib.get('t') == 's':
                    text = shared[int(text)]
                elif cell.attrib.get('t') == 'inlineStr':
                    text = ''.join(cell.find('m:is', NS).itertext())
                cells[col] = str(text or '').strip()
            result.append(cells)
        return result


def source(key, title, url, path, data_url, edition, **extra):
    return dict(id=key, title=title, url=url, dataUrl=data_url, edition=edition,
                reviewed=REVIEWED, sha256=hashlib.sha256(path.read_bytes()).hexdigest(), **extra)


def identity(country, scientific):
    return country[:2] + '-' + hashlib.sha256(scientific.encode()).hexdigest()[:12]


def bird(country, scientific, common, family, origin, occurrence, status, source_id, **extra):
    return dict(id=identity(country, scientific), scientificName=scientific, commonName=common,
                localName='', family=family, origin=origin, occurrence=occurrence,
                sourceStatus=status, sourceId=source_id, aliases=[], historical=False,
                referenceOnly=False, **extra)


def colombia(directory):
    path = directory / 'co-2026.xlsx'
    old_path = directory / 'co-2022-dwca.zip'
    with ZipFile(old_path) as archive:
        previous = list(csv.DictReader(io.StringIO(archive.read('taxon.txt').decode()), delimiter='\t'))
    names = {row['scientificName']: row['vernacularName'] for row in previous}
    records, excluded = [], []
    for index, row in enumerate(workbook_rows(path, 2)[1:], 2):
        scientific, old = row.get('E', ''), row.get('D', '')
        if not re.fullmatch(r'[A-Z][a-z]+ [a-z-]+', scientific):
            excluded.append(dict(row=index, previousName=old, reason='No valid 2026 species name in the published row'))
            continue
        status = row.get('G', '')
        origin = 'endemic' if 'Endémica' in status else 'introduced' if 'Exótica' in status else 'unknown' if 'Hipotética' in status else 'native'
        occurrence = 'uncertain' if '?' in status or 'Hipotética' in status else 'historical' if 'Extinta' in status else 'vagrant' if 'Errática' in status else 'migrant' if 'Migratorio' in status else 'introduced' if 'Exótica' in status else 'resident' if 'Residente' in status else 'unknown'
        common = names.get(scientific) or scientific
        record = bird('colombia', scientific, common, row.get('B', ''), origin, occurrence, status, 'ccro-2026')
        record.update(previousScientificName=old if old != scientific else '', historical=occurrence == 'historical',
                      referenceOnly='Hipotética' in status, nameSourceId='aco-2022' if common != scientific else 'ccro-2026')
        crosswalk = row.get('F', '')
        if crosswalk and crosswalk != '#N/A' and crosswalk != scientific:
            # The supplied 2025 crosswalk can name a subspecies. Retain, never merge.
            record['sourceCrosswalk'] = crosswalk
        records.append(record)
    assert len(records) == 1983 and len(excluded) == 3, 'Review changed CCRO source before updating'
    return dict(countryId='colombia', name='Colombia', schemaVersion=1, reviewed=REVIEWED,
                scope='CCRO July 2026 national reference, including hypothetical, rare, migrant and historical entries. The source labels its 2026 taxonomy as in progress. Country membership does not establish presence in a planning region.',
                sources=[source('ccro-2026', 'Comité Colombiano de Registros Ornitológicos', 'https://ccro.asociacioncolombianadeornitologia.org/lista-oficial-de-aves-de-colombia/', path, 'https://ccro.asociacioncolombianadeornitologia.org/wp-content/uploads/2026/08/CCRO-actualizacion-JULIO-2026-Lista-de-aves-de-Colombia.xlsx', 'July 2026'),
                         source('aco-2022', 'Echeverry-Galvis et al. / Asociación Colombiana de Ornitología', 'https://doi.org/10.15472/qhsz0p', old_path, 'https://ipt.biodiversidad.co/sib/archive.do?r=aco_listaavescolombia2017', '2022 checklist, dataset v1.5 (2023)', license='CC BY 4.0', usage='English common names attached only on exact scientific-name matches. Previous names remain searchable references and never silently merge taxa. Older threat assessments are not imported.')], excludedRows=excluded, species=records)


def australia(directory):
    import pdfplumber
    path, wlab_path = directory / 'au-2026.pdf', directory / 'au-wlab-2023.xlsx'
    rows = []
    with pdfplumber.open(path) as document:
        for page in document.pages:
            for table in page.extract_tables():
                for row in table:
                    cells = [' '.join(value.split()) for value in row if value and value.strip()]
                    if len(cells) == 2 and re.fullmatch(r'[A-Z][a-z]+ [a-z-]+', cells[1]):
                        rows.append(cells)
    assert len(rows) == len({row[1] for row in rows}) == 977, 'Review PDF layout or taxonomy change'
    older = {r['G']: r for r in workbook_rows(wlab_path)[1:] if r.get('C') == 'sp'}
    records = []
    for marked_name, scientific in rows:
        parts, flags = marked_name.split(), []
        while parts[-1] in {'V', 'R', '*', 'D'}:
            flags.insert(0, parts.pop())
        old = older.get(scientific, {})
        population = old.get('K', '')
        origin = 'introduced' if '*' in flags else 'endemic' if population in {'Endemic', 'Extinct (Endemic)'} else 'native' if population in {'Australian', 'Non-breeding', 'Vagrant', 'Endemic (breeding only)', 'Extinct (Australia only)'} else 'unknown'
        occurrence = 'uncertain' if 'No confirmed' in population or population.endswith('?') else 'historical' if population == 'Extinct (Endemic)' else 'vagrant' if population.startswith('Vagrant') else 'introduced' if '*' in flags else 'unknown'
        record = bird('australia', scientific, ' '.join(parts), old.get('I', ''), origin, occurrence, marked_name, 'bq-2026')
        # V/R in this PDF can describe Queensland rather than the whole country.
        # Do not turn that flag into a national range or country rarity assertion.
        record.update(sourceFlags=flags, statusSourceId='wlab-2023' if old else 'bq-2026',
                      populationStatus=population, regionalExtinction=population == 'Extinct (Australia only)', historical=occurrence == 'historical',
                      referenceOnly='D' in flags or population in {'Domestic', 'Failed introduction', 'No confirmed record'})
        records.append(record)
    return dict(countryId='australia', name='Australia', schemaVersion=1, reviewed=REVIEWED,
                scope='Birds Queensland Australian species names, AviList 2026 release 2. Includes external territories and unusual records, not just the nine AVES planning regions. Origin and population status are attached only on exact scientific-name matches to WLAB v4.3 (2023). V/R flags may refer to Queensland and are not national rarity claims.',
                sources=[source('bq-2026', 'Birds Queensland, Australian bird species names', 'https://birdsqueensland.org.au/what-bird-is-this/bird-lists/', path, 'https://birdsqueensland.org.au/wp-content/uploads/2026/11/AviList-2026-Aust_names.pdf', 'AviList 2026, release 2, 20 October 2026', usage='Factual names and source flags only. No copied descriptions, illustrations or page design.'),
                         source('wlab-2023', 'BirdLife Australia Working List of Australian Birds', 'https://birdata.birdlife.org.au/taxonomy-25', wlab_path, 'https://birdata.birdlife.org.au/wp-content/uploads/2023/10/WLAB_v4.3.xlsx', 'WLAB v4.3, 19 October 2023', usage='Exact-match family and population/origin reference. National 2020 threat assessments are not imported as current global conservation status.')], excludedRows=[], species=records)


def new_zealand(directory):
    legacy = json.loads((ROOT / 'content/new-zealand-checklist.json').read_text())
    existing = {old['scientificName']: old for old in legacy['species']}
    records = []
    for row in workbook_rows(directory / 'nz-2024.xlsx'):
        if row.get('K') != 'Species' or row.get('L') != 'Main text':
            continue
        scientific = ' '.join(row['B'].split())
        old = existing[scientific]  # A source-name change requires explicit review.
        common = row['G'].strip()
        local = row.get('H', '').split('|')[0].strip().rstrip('*')
        if local.casefold() == common.casefold():
            local = ''
        extinct = row.get('N') == 'Extinct'
        rare = row.get('O') == 'Vagrant'
        origin = row['M'].strip().lower()
        occurrence = 'historical' if extinct else 'vagrant' if rare else 'introduced' if origin == 'introduced' else 'unknown'
        record = bird('new-zealand', scientific, common, row['J'].strip(), origin, occurrence, row['N'].strip(), 'birdsnz-2024')
        record.update(id=old['id'], localName=local, historical=extinct)
        records.append(record)
    assert len(records) == 432
    src = legacy['source']
    return dict(countryId='new-zealand', name='New Zealand', schemaVersion=1, reviewed=REVIEWED,
                scope=src['scope'] + ' Existing wish-list IDs are preserved. Country membership does not establish island presence.',
                sources=[source('birdsnz-2024', src['title'], src['url'], directory / 'nz-2024.xlsx', src['dataUrl'], 'Sixth edition, 2024')], excludedRows=[], species=records)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-dir', type=Path, required=True)
    args = parser.parse_args()
    output = ROOT / 'content/species'
    output.mkdir(exist_ok=True)
    for build in [colombia, australia, new_zealand]:
        data = build(args.source_dir)
        path = output / (data['countryId'] + '.json')
        path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n')
        print(data['countryId'], len(data['species']), 'entries,', sum(not (b['historical'] or b['referenceOnly']) for b in data['species']), 'default browser entries')


if __name__ == '__main__':
    main()
