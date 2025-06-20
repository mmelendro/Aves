import { NavigationHeader } from "@/components/navigation-header"

export default function Page() {
  return (
    <div className="bg-white">
      <header className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        {/* Navigation Header */}
        <NavigationHeader currentPage="/blog" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Páramo Manizales Thornbill</h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Learn about the Páramo Manizales Thornbill, a hummingbird endemic to the high-altitude páramo ecosystems
              of Colombia.
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1682077384144-99c08a197a34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gray-900 mix-blend-multiply" aria-hidden="true" />
      </header>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <article className="prose prose-lg text-gray-500">
            <p>
              The Páramo Manizales Thornbill (Ramphomicron heteropogon) is a species of hummingbird found only in the
              páramo ecosystems of Colombia, specifically in the departments of Caldas, Risaralda, and Quindío. These
              high-altitude environments are characterized by their unique flora and fauna, adapted to the harsh
              conditions of the Andes mountains.
            </p>
            <h2>Habitat and Distribution</h2>
            <p>
              This thornbill inhabits the edges of elfin forests and shrubby páramo vegetation at elevations ranging
              from 3,000 to 4,000 meters above sea level. Its distribution is limited to a small area, making it
              particularly vulnerable to habitat loss and climate change.
            </p>
            <h2>Description</h2>
            <p>
              The Páramo Manizales Thornbill is a small hummingbird, measuring around 9 cm in length. Males have a
              distinctive long, forked tail, while females have a shorter, less forked tail. The plumage is mostly
              green, with a blue throat in males and a speckled throat in females.
            </p>
            <h2>Conservation Status</h2>
            <p>
              Due to its restricted range and habitat loss, the Páramo Manizales Thornbill is considered a vulnerable
              species. Conservation efforts are focused on protecting and restoring its páramo habitat.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}
