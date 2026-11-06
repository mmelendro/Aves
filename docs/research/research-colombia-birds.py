import concurrent.futures
import json
import pathlib
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
BIRDS = {
    'santa-marta-brushfinch': 'Atlapetes melanocephalus',
    'santa-marta-parakeet': 'Pyrrhura viridicata',
    'white-tailed-starfrontlet': 'Coeligena phalerata',
    'jabiru': 'Jabiru mycteria',
    'scarlet-ibis': 'Eudocimus ruber',
    'hoatzin': 'Opisthocomus hoazin',
    'scarlet-macaw': 'Ara macao',
    'sunbittern': 'Eurypyga helias',
    'choco-toucan': 'Ramphastos brevis',
    'apical-flycatcher': 'Myiarchus apicalis',
}

def get(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'AVES-Colombia-media-research/1.0 (public attribution review)'})
    with urllib.request.urlopen(request, timeout=45) as response:
        return json.load(response)

def research(item):
    slug, name = item
    result = {'scientificName': name}
    queries = {
        'images': 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode({
            'action': 'query', 'format': 'json', 'generator': 'search', 'gsrsearch': '"' + name + '" filetype:bitmap',
            'gsrnamespace': 6, 'gsrlimit': 8, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata', 'iiurlwidth': 1200, 'iiurlheight': 1200,
        }),
        'observations': 'https://api.inaturalist.org/v1/observations?' + urllib.parse.urlencode({
            'taxon_name': name, 'sounds': 'true', 'quality_grade': 'research', 'sound_license': 'cc0,cc-by,cc-by-sa', 'per_page': 50,
        }),
    }
    for kind, url in queries.items():
        try:
            result[kind] = get(url)
        except Exception as error:
            result[kind] = {'error': str(error)}
    (ROOT / ('colombia-' + slug + '-research.json')).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf8')
    print(json.dumps({'bird': slug, 'images': len(result['images'].get('query', {}).get('pages', {})), 'sounds': result['observations'].get('total_results'), 'errors': [v.get('error') for v in result.values() if isinstance(v, dict) and v.get('error')]}), flush=True)

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(research, BIRDS.items()))
