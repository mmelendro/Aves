/**
 * Colombia homepage at /colombia. Reading order: hero/map/carousel, personal story,
 * region links, trip styles, planning steps, then the shared inquiry form.
 * The short lists below control homepage teasers; full bird/region facts live in content/.
 */
import type { Metadata } from "next"
import { canonicalUrl } from "@/lib/site-path"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bird, Camera, FileCheck2, Heart, Leaf, MapPin, MessageCircle, NotebookPen } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import ColombiaHeroExplorer from "@/components/colombia-hero-explorer"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"
import { ContactFormSection } from "@/components/contact-form-section"

// Homepage teaser text and URL slugs. Keep slugs aligned with the full region catalogue.
const regions = [
  { slug: "pacific", name: "Costa Pacífica y Chocó", description: "Selva húmeda, ríos y piedemonte del Pacífico" },
  { slug: "western-andes", name: "Cordillera Occidental", description: "Bosque de niebla y laderas de la cordillera Occidental" },
  { slug: "central-andes", name: "Cordillera Central", description: "Bosque de niebla, paisajes cafeteros y páramo" },
  { slug: "eastern-andes", name: "Cordillera Oriental", description: "Bosque de montaña y humedales altoandinos" },
  { slug: "cauca-valley", name: "Valle del Cauca", description: "Hábitats ribereños, bosque seco y piedemonte" },
  { slug: "magdalena-valley", name: "Valle del Magdalena", description: "Un corredor fluvial y mosaicos de bosque" },
  { slug: "caribbean", name: "Caribe", description: "Matorral seco, bosque costero y humedales" },
  { slug: "sierra-nevada-de-santa-marta", name: "Sierra Nevada de Santa Marta", description: "Bosques de montaña sobre las tierras bajas del Caribe" },
  { slug: "llanos", name: "Llanos", description: "Sabanas, humedales y bosques de galería" },
  { slug: "amazonia", name: "Amazonia", description: "Selva de tierras bajas y ríos amazónicos" },
  { slug: "colombian-massif", name: "Macizo Colombiano", description: "Bosque andino y páramo del sur de Colombia" },
]

const experiences = [
  { name: "Adventure", icon: Bird, title: "Sigue a las aves", description: "Haz de las aves y sus hábitats el corazón de tu viaje. Explora la colección Adventure y cuéntanos qué especies te gustaría encontrar.", href: "/tours/adventure" },
  { name: "Vision", icon: Camera, title: "Dale tiempo a la fotografía", description: "Descubre viajes pensados para la fotografía. Háblanos de tus intereses, tu equipo y el tiempo que te gusta dedicar a cada salida.", href: "/tours/vision" },
  { name: "Elevate", icon: Leaf, title: "Encuentra tu forma de descansar", description: "Conoce la colección Elevate y conversemos sobre el alojamiento, el ritmo y los detalles que harán especial tu experiencia.", href: "/tours/elevate" },
  { name: "Souls", icon: Heart, title: "Comparte la experiencia", description: "Descubre la colección Souls: experiencias para parejas que quieren dedicarles tiempo a las aves, a la naturaleza y a estar juntos.", href: "/tours/souls" },
]

const planningSteps = [
  { title: "Cuéntanos qué te inspira", icon: MessageCircle, text: "Una región, un ave, unas fechas tentativas o tu forma favorita de viajar. Escríbenos con las ideas que tengas hasta ahora." },
  { title: "Démosle forma al viaje", icon: NotebookPen, text: "Conversemos sobre la ruta, el ritmo, las caminatas, el alojamiento y los guías." },
  { title: "Confirma los detalles", icon: FileCheck2, text: "Revisa la disponibilidad, el itinerario, el precio, lo que incluye y las condiciones de reserva antes de decidir." },
]

export const metadata: Metadata = {
  title: { absolute: "AVES Colombia | Viajes para descubrir nuestras aves" },
  description: "Explora las regiones de Colombia, conoce sus aves, escucha sus cantos y planea un viaje a tu medida con AVES.",
  alternates: { canonical: canonicalUrl("/colombia") },
  openGraph: {
    locale: "es_CO",
    title: "AVES Colombia | Viajes para descubrir nuestras aves",
    description: "Descubre las regiones y las aves de Colombia y construye un viaje a tu medida con AVES.",
    url: canonicalUrl("/colombia"),
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES Colombia | Viajes para descubrir nuestras aves",
    description: "Descubre las regiones y las aves de Colombia y construye un viaje a tu medida con AVES.",
    images: ["/images/green-bearded-helmetcrest.png"],
  },
}

export default function AVESLandingPage() {
  return (
    <div lang="es-CO" className="min-h-screen bg-white">
      <NavigationHeader currentPage="/colombia" />
      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-10 lg:py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-9">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-medium text-emerald-800 sm:text-sm"><MapPin className="h-4 w-4" aria-hidden="true" />AVES Colombia · Viajes de avistamiento de aves</p>
              <h1 className="text-balance text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Descubre la <span className="text-emerald-700">extraordinaria diversidad de aves de Colombia</span></h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">Viajes diseñados contigo para conectar las aves, los paisajes y la cultura local de Colombia. Cuéntanos qué te inspira y te ayudaremos a elegir la ruta, el ritmo y dónde alojarte.</p>
            </div>
            <ColombiaHeroExplorer resizable />
          </div>
        </section>

        <section className="bg-stone-50/70 py-12 sm:py-16" aria-labelledby="story-heading">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
            <figure className="min-w-0">
              <Image src="/images/martin-melendro.jpg" alt="Martín Melendro observando aves con binoculares en un paisaje de montaña" width={960} height={720} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <figcaption className="mt-3 text-xs leading-5 text-gray-500"><Link href="/team#martin-melendro" className="inline-flex min-h-11 items-center rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Martín Melendro · Construyendo AVES</Link></figcaption>
            </figure>
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-700">Un viaje diseñado contigo</p>
              <h2 id="story-heading" className="text-balance text-3xl font-medium leading-tight tracking-tight text-gray-900 lg:text-4xl">Tus intereses. Tu ritmo.<br />Tu Colombia.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">Una mañana escuchando el bosque, una buena comida, un lugar donde quieras quedarte un rato más. Las aves pueden ser el comienzo de un viaje mucho más enriquecedor.</p>
              <p className="mt-4 leading-7 text-gray-600">Planéalo con AVES. Conversaremos sobre los guías locales, los tiempos de recorrido y el alojamiento para construir un itinerario y una cotización a tu medida.</p>
              <dl className="mt-6 grid gap-4 border-y border-emerald-100 py-5 sm:grid-cols-3">
                <div><dt className="font-medium text-emerald-950">Naturaleza a tu ritmo</dt><dd className="mt-1 text-sm leading-6 text-gray-600">Encuentra tu equilibrio entre avistamiento, caminatas y tiempo para disfrutar el lugar.</dd></div>
                <div><dt className="font-medium text-emerald-950">Sabores e historias locales</dt><dd className="mt-1 text-sm leading-6 text-gray-600">Reserva tiempo para los museos, la cocina regional y las experiencias con anfitriones locales.</dd></div>
                <div><dt className="font-medium text-emerald-950">Comodidad a tu medida</dt><dd className="mt-1 text-sm leading-6 text-gray-600">Cuéntanos dónde te gusta alojarte, cuál es tu presupuesto y qué detalles son importantes para ti.</dd></div>
              </dl>
              <Link href="/contact" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Planear mi viaje por Colombia<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <p className="mt-3 text-xs leading-5 text-gray-500">Confirmamos personalmente las rutas, los guías, la disponibilidad y los precios. Los avistamientos de fauna silvestre no están garantizados.</p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-white to-emerald-50/60 py-14 lg:py-20" aria-labelledby="regions-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Un país de hábitats diversos</p>
              <h2 id="regions-heading" className="text-3xl font-medium text-gray-900 lg:text-4xl">Encuentra tu rincón de Colombia.</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">Empieza por un paisaje. Explora el mapa o elige una región para descubrir sus aves y las posibilidades para tu viaje.</p>
            </div>
            <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
              <Link href="/aves-explorer" className="group block rounded-2xl border border-emerald-100 bg-white p-5 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7">
                <ColombiaMapArtwork alt="Mapa de Colombia con sus regiones de avistamiento de aves" width={634} height={802} sizes="(min-width: 1024px) 40vw, 90vw" className="mx-auto h-auto max-h-[580px] w-full object-contain" />
                <span className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 text-center font-semibold text-emerald-800 group-hover:bg-emerald-100">
                  Abrir el mapa interactivo <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </Link>
              <nav aria-label="Regiones de avistamiento de aves de Colombia" className="grid gap-3 sm:grid-cols-2">
                {regions.map((region) => (
                  <Link key={region.slug} href={"/regions/" + region.slug} className="group flex min-h-24 items-start justify-between gap-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                    <span><span className="block font-semibold text-gray-900">{region.name}</span><span className="mt-1 block text-sm leading-relaxed text-gray-600">{region.description}</span></span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20" aria-labelledby="experiences-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Tus intereses, tu viaje</p>
              <h2 id="experiences-heading" className="text-3xl font-medium text-gray-900 lg:text-4xl">¿Qué te invita a salir a explorar?</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">Conoce las cuatro colecciones de AVES y conversemos sobre el viaje que va contigo.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {experiences.map(({ name, icon: Icon, title, description, href }) => (
                <article key={name} className="flex flex-col rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-6 shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" /></div>
                  <p className="mb-2 text-sm font-semibold text-emerald-700">{name}</p>
                  <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                  <p className="mb-6 mt-3 flex-1 leading-relaxed text-gray-600">{description}</p>
                  <Link href={href} className="inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
                    Explorar {name}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>



        <section className="bg-white py-14 lg:py-20" aria-labelledby="planning-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">De la primera idea a un viaje a tu medida</p>
              <h2 id="planning-heading" className="text-3xl font-medium text-gray-900 lg:text-4xl">Un poco de planeación. Mucho por descubrir.</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600">Cuéntanos tus intereses, las fechas que tienes en mente y tu ritmo ideal. Confirmamos contigo el itinerario, la disponibilidad y los detalles del viaje.</p>
            </div>
            <ol className="grid gap-7 md:grid-cols-3">
              {planningSteps.map(({ title, icon: Icon, text }, index) => (
                <li key={title} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-md">
                  <div className="mb-5 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800">{index + 1}</span><Icon className="h-6 w-6 text-emerald-600" aria-hidden="true" /></div>
                  <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-7 text-center"><Link href="/how-it-works" className="inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-700 underline-offset-4 hover:underline">Cómo planeamos tu viaje con AVES <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          </div>
        </section>

        <p className="mx-auto max-w-7xl px-4 pb-8 text-center text-sm text-gray-600">AVES está trabajando para obtener la certificación B Corp; aún no cuenta con ella. <Link href="/about/b-corp" className="inline-flex min-h-11 items-center font-medium text-emerald-800 underline underline-offset-4">Nuestro camino hacia B Corp</Link></p>

        <div id="contact" className="scroll-mt-24">
          <ContactFormSection showTitle={true} showFAQ={false} variant="homepage" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
