"""Copy the reviewed public explorer into this independently deployed application.
Usage: python scripts/sync-public-explorer.py /path/to/main-checkout
The manifest records the authoritative commit and hashes. No backend/account code
is imported. Small host adapters share the existing player, header state and links.
"""
from pathlib import Path
import hashlib,json,re,sys
source=Path(sys.argv[1]).resolve()
root=Path(__file__).resolve().parents[1]
target=root/'components/public-explorer'
namespace='@/components/public-explorer/'
# These contexts must stay identical to the host layout, never copied.
adapters={
 'components/aves-media-provider.tsx':'export { useAvesMedia } from "@/components/aves-media-provider"\n',
 'components/header-landscape-context.tsx':'export * from "@/components/header-landscape-context"\n',
 'components/bird-discovery-context.tsx':'export * from "@/components/bird-discovery-context"\n',
 'components/brand-bird.tsx':'export * from "@/components/brand-bird"\n',
 'lib/utils.ts':'export * from "@/lib/utils"\n',
 'components/ui/card.tsx':'export * from "@/components/ui/card"\n',
 'components/ui/dialog.tsx':'export * from "@/components/ui/dialog"\n',
 'components/new-zealand-checklist-photo.tsx':'''"use client"
import HostPhoto from "@/components/new-zealand-checklist-photo"
import type { NzChecklistMedia } from "../content/new-zealand-checklist-media"
export default function ReferencePhoto({photo,name}:{photo:NzChecklistMedia;name:string}) {
 return <HostPhoto name={name} photo={{id:photo.bird.scientificName,commonName:photo.bird.commonName,scientificName:photo.bird.scientificName,asset:photo.bird.image,kind:photo.kind || "photograph",credit:photo.credit}}/>
}
''',
}
def resolve(path):
 for candidate in [path,Path(str(path)+'.ts'),Path(str(path)+'.tsx'),Path(str(path)+'.mjs'),Path(str(path)+'.json')]:
  if candidate.is_file():return candidate.resolve()
 raise ValueError(f'Unresolved public import: {path}')
seen=set()
pattern=r'(?:from\s*|import\s*\()\s*[\"\']([^\"\']+)'
def walk(file):
 file=file.resolve();key=file.relative_to(source).as_posix()
 if key in seen:return
 seen.add(key)
 if file.suffix=='.mjs' and file.with_suffix('.d.mts').exists():seen.add(file.with_suffix('.d.mts').relative_to(source).as_posix())
 if key in adapters or file.suffix in ['.json','.css']:return
 for name in re.findall(pattern,file.read_text()):
  if name.startswith(('@/','.')):walk(resolve(source/name[2:] if name.startswith('@/') else file.parent/name))
for entry in ['components/destination-explorer-page.tsx','components/world-destination-map.tsx','components/header-contour.tsx','lib/header-landscape.mjs']:walk(source/entry)
def asset_paths(text):
 # Keep public media on its existing main-domain URL in Australian previews too.
 return re.sub(r'([\"\'`])(/(?:images/|audio/|placeholder\.svg)[^\"\'`\s]*)',lambda m:m[1]+'https://aves.bio'+m[2],text)
records=[]
for key in sorted(seen):
 original=(source/key).read_text();text=adapters.get(key)
 if text is None:
  text=original
  def rewrite(match):
   name=match.group(2)
   if name=='next/link':replacement=namespace+'adapters/link'
   elif name=='next/image':replacement=namespace+'adapters/image'
   elif name.startswith('@/'):replacement=namespace+name[2:]
   else:return match.group(0)
   return match.group(1)+replacement+match.group(3)
  text=re.sub(r'((?:from\s*|import\s*\()\s*[\"\'])([^\"\']+)([\"\'])',rewrite,text)
  if key != 'content/global-australian-birds.json':text=asset_paths(text)
  if key == 'content/destination-birds.ts':
   text=text.replace('`/australia${bird.image}`','`https://aves.bio/australia${bird.image}`').replace('`/australia${bird.audioFile}`','`https://aves.bio/australia${bird.audioFile}`')
 dest=target/key;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(text)
 records.append({'path':key,'sourceSha256':hashlib.sha256(original.encode()).hexdigest(),'sha256':hashlib.sha256(text.encode()).hexdigest(),'adapter':key in adapters})
(target/'adapters').mkdir(exist_ok=True)
(target/'adapters/link.tsx').write_text('''import type { ComponentProps } from "react"
/** Public URLs already include their destination prefix. Native anchors preserve
 * cross-application navigation and the host player's paused handoff. */
export default function PublicLink({href,children,...props}:ComponentProps<"a">){return <a href={href} {...props}>{children}</a>}
''')
(target/'adapters/image.tsx').write_text('''import Image from "next/image"
import type { ComponentProps } from "react"
export type { ImageProps } from "next/image"
/** Public source media is already hosted and credited by AVES. Avoid a second
 * optimizer/provider request or an Australian base-path rewrite. */
export default function PublicImage(props:ComponentProps<typeof Image>){return <Image {...props} unoptimized/>}
''')
(target/'lib/photo-zoom.d.mts').write_text('export function photoZoomLimit(width:number,height:number,viewportWidth:number,viewportHeight:number):number\n')
(target/'manifest.json').write_text(json.dumps({'sourceRepository':'mmelendro/Aves','sourceCommit':'b891afdf6304d4e958a11fddbfe0713da074b4d6','purpose':'Pinned public explorer; Australian backend remains independent','mediaOrigin':'https://aves.bio','files':records},indent=2)+'\n')
print(json.dumps({'files':len(records),'bytes':sum((target/r['path']).stat().st_size for r in records)}))
