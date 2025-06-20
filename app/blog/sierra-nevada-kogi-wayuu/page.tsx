import Image from "next/image"

export default function Page() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">
        Sierra Nevada de Santa Marta: Kogi, Wayuu, and the Golden-headed Quetzal
      </h1>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
        <Image
          src="/images/golden-headed-quetzal.jpg"
          alt="Golden-headed Quetzal (Pharomachrus auriceps) displaying its brilliant emerald plumage and golden head in Sierra Nevada cloud forest"
          width={1200}
          height={675}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
          <p className="text-sm font-medium">Golden-headed Quetzal (Pharomachrus auriceps)</p>
          <p className="text-xs opacity-90">Endemic to the Sierra Nevada cloud forests</p>
        </div>
      </div>

      <p className="mb-6">
        The Sierra Nevada de Santa Marta is an isolated mountain range in northern Colombia, rising abruptly from the
        Caribbean coast. This unique geographical feature creates a diverse range of ecosystems, from tropical
        rainforests to cloud forests and even páramo (high-altitude tundra). It is home to two distinct indigenous
        groups: the Kogi and the Wayuu.
      </p>

      <h2 className="text-2xl font-semibold mb-4">The Kogi People</h2>
      <p className="mb-6">
        The Kogi are an ancient civilization that has managed to preserve their traditional way of life for centuries.
        They believe they are the "Elder Brothers" of humanity and are responsible for maintaining the balance of the
        world. They live in small, isolated villages high in the mountains and practice a deep connection with nature.
      </p>

      <h2 className="text-2xl font-semibold mb-4">The Wayuu People</h2>
      <p className="mb-6">
        In contrast to the Kogi, the Wayuu inhabit the arid La Guajira Peninsula to the north of the Sierra Nevada. They
        are the largest indigenous group in Colombia and are known for their strong matriarchal society and their
        vibrant textile traditions, particularly their intricate woven bags called "mochilas."
      </p>

      <h2 className="text-2xl font-semibold mb-4">The Golden-headed Quetzal</h2>
      <p className="mb-6">
        The cloud forests of the Sierra Nevada are also home to a remarkable array of biodiversity, including the
        Golden-headed Quetzal (Pharomachrus auriceps). This stunning bird, with its iridescent emerald plumage and
        golden head, is a symbol of the region's natural beauty.
      </p>

      <p className="mb-6">
        The Sierra Nevada de Santa Marta is a place of immense cultural and ecological significance. It is a reminder of
        the importance of preserving indigenous traditions and protecting biodiversity for future generations.
      </p>
    </div>
  )
}
