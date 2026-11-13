/** Public interactive tiles only. No prefetch, bulk download or offline packs. */
export const mapBasemaps={
 satellite:{label:"Satellite",url:"https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg",maxNativeZoom:14,attribution:'EOxCloudless <a href="https://cloudless.eox.at">EOX</a> · Copernicus Sentinel 2016 · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>'},
 roads:{label:"Roads & cities",url:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",maxNativeZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/fixthemap">Report a map issue</a>'},
 topographic:{label:"Topographic",url:"https://tile.opentopomap.org/{z}/{x}/{y}.png",maxNativeZoom:17,attribution:'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · DEM: SRTM, Sonny · map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA</a>)'},
} as const
export const mapBackgroundChoices=[['habitats','Planning map'],['satellite','Satellite'],['roads','Roads & cities'],['topographic','Topographic']] as const
