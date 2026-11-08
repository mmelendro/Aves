#!/usr/bin/env python3
"""Install pinned native QA services outside the application. Linux x86_64 only."""
import argparse
import hashlib
import json
import pathlib
import platform
import subprocess
import tarfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--runtime', required=True)
args = parser.parse_args()
repo = pathlib.Path(__file__).resolve().parents[2]
runtime = pathlib.Path(args.runtime).resolve()
if runtime == repo or repo in runtime.parents:
    parser.error('Use a runtime directory outside the Git repository')
if platform.system() != 'Linux' or platform.machine() != 'x86_64':
    parser.error('These pinned binaries require Linux x86_64')
runtime.mkdir(parents=True, exist_ok=True, mode=0o700)
(runtime / 'bin').mkdir(exist_ok=True)
package = runtime / 'package.json'
if not package.exists():
    package.write_text(json.dumps({'private': True, 'dependencies': {'embedded-postgres': '17.11.0-beta.19'}}, indent=2)+'\n')
else:
    if json.loads(package.read_text()).get('dependencies', {}).get('embedded-postgres') != '17.11.0-beta.19':
        parser.error('Runtime package must pin embedded-postgres to 17.11.0-beta.19')
# This isolated package is test tooling. AVES itself still uses its pinned pnpm
# and single root pnpm-lock.yaml. No application dependency is installed here.
subprocess.run(['npm', 'install', '--prefix', str(runtime), '--ignore-scripts', '--no-audit', '--no-fund'], check=True)
archives = [
    ('auth.tar.xz', 'https://github.com/supabase/auth/releases/download/v2.197.0/auth-v2.197.0-amd64.tar.xz',
     'b5c2991d1df760c9b099c1c2395a94bd1c2f83ed58901934921997179dc9f7ea'),
    ('postgrest.tar.xz', 'https://github.com/PostgREST/postgrest/releases/download/v16.5/postgrest-v16.5-linux-static-x86-64.tar.xz',
     '5099e7ada38f9f6846cd87c14c5f158b7c165f1e9959665ad412e61f4dceba95'),
]
for name, url, expected in archives:
    archive = runtime / name
    if not archive.exists():
        subprocess.run(['curl', '--fail', '--location', '--silent', '--show-error', '--proto', '=https',
                        '--proto-redir', '=https', '--output', str(archive), url], check=True)
    if hashlib.sha256(archive.read_bytes()).hexdigest() != expected:
        raise SystemExit(f'{name}: checksum mismatch')
    with tarfile.open(archive) as bundle:
        # Python's data filter rejects escaping paths and unsafe link targets.
        bundle.extractall(runtime / 'bin', filter='data')
print('Pinned PostgreSQL 17.11, Supabase Auth 2.197.0 and PostgREST 16.5 are ready.')
