import { NavigationHeader } from "@/components/navigation-header"

export default function ChocoEndemicExpedition() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/blog" />

      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4">Choco Endemic Expedition</h1>
        <p className="text-gray-700 mb-8">A journey to discover the unique flora and fauna of the Choco region.</p>

        <img
          src="/images/choco-endemic-expedition.jpg"
          alt="Choco Endemic Expedition"
          className="rounded-lg shadow-md mb-8"
        />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-700">
            The Choco region, straddling the Pacific coast of Colombia and Ecuador, is a biodiversity hotspot renowned
            for its high concentration of endemic species. This expedition aims to explore and document the unique
            plants and animals found nowhere else on Earth.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Identify and catalog endemic plant species.</li>
            <li>Document the behavior and habitat of endemic animal species.</li>
            <li>Assess the conservation status of threatened species.</li>
            <li>Raise awareness about the importance of protecting the Choco region's biodiversity.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
          <p className="text-gray-700">
            The expedition will span three weeks, covering various ecosystems within the Choco region, including
            rainforests, cloud forests, and coastal mangroves.
          </p>
          <ol className="list-decimal list-inside text-gray-700">
            <li>Week 1: Exploring the lowland rainforests near Tumaco, Colombia.</li>
            <li>Week 2: Ascending into the cloud forests of the Andes foothills.</li>
            <li>Week 3: Investigating the coastal mangroves and estuaries.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
          <p className="text-gray-700">
            The Choco Endemic Expedition promises to be a valuable contribution to our understanding of this remarkable
            region and its unique biodiversity. By documenting and raising awareness about the Choco's endemic species,
            we hope to inspire conservation efforts and ensure the long-term survival of this natural treasure.
          </p>
        </section>
      </div>
    </main>
  )
}
