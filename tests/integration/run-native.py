#!/usr/bin/env python3
"""Run disposable local integration services, without cloud credentials or Docker."""
import argparse
import json
import os
import pathlib
import subprocess
import tempfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--runtime", required=True, help="Private directory with pinned PostgreSQL, Auth and PostgREST binaries")
parser.add_argument("--node", default="node")
parser.add_argument("--output", required=True)
args = parser.parse_args()
repo = pathlib.Path(__file__).resolve().parents[2]
report_path = pathlib.Path(args.output).resolve()
report_path.unlink(missing_ok=True)
with tempfile.TemporaryDirectory(prefix="aves-native-qa-") as tmp:
    qa = pathlib.Path(tmp)
    os.chmod(qa, 0o700)
    cert, key = qa / "certificate.pem", qa / "key.pem"
    subprocess.run(["openssl", "req", "-x509", "-newkey", "rsa:2048", "-nodes", "-days", "1",
                    "-subj", "/CN=AVES disposable local integration",
                    "-addext", "subjectAltName=IP:127.0.0.1,DNS:localhost",
                    "-keyout", str(key), "-out", str(cert)], check=True, capture_output=True)
    env = {**os.environ, "NODE_EXTRA_CA_CERTS": str(cert), "NO_PROXY": "127.0.0.1,localhost,::1",
           "no_proxy": "127.0.0.1,localhost,::1", "AVES_QA_ROOT": str(qa),
           "AVES_QA_RUNTIME": str(pathlib.Path(args.runtime).resolve()),
           "AVES_QA_REPORT": str(pathlib.Path(args.output).resolve())}
    result = subprocess.run([args.node, str(repo / "tests/integration/native-runtime.mjs")], cwd=repo, env=env)
if report_path.exists():
    report = json.loads(report_path.read_text())
    report['fixtureDataRemoved'] = not qa.exists()
    report_path.write_text(json.dumps(report, indent=2)+'\n')
raise SystemExit(result.returncode)
