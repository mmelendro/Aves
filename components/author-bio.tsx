import Image from "next/image"

function AuthorBio() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-12">
      <div className="flex items-start space-x-4">
        <Image
          src="/images/martin-melendro.jpg"
          alt="Martin Melendro - AVES Expedition Leader and Ornithologist"
          width={80}
          height={80}
          className="rounded-full object-cover flex-shrink-0"
        />
        <div>
          <h3 className="font-bold text-gray-900 mb-2">About Martin Melendro</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Martin is AVES' lead expedition guide and ornithologist, with over 15 years of experience exploring
            Colombia's diverse ecosystems. Fluent in Spanish, English, and basic indigenous languages, he specializes in
            building respectful partnerships with local communities while leading transformative birding experiences.
            Martin holds a degree in Biology from Universidad Nacional de Colombia and has contributed to numerous
            conservation projects throughout the Neotropics. His passion lies in connecting people with nature while
            supporting indigenous land rights and biodiversity conservation.
          </p>
        </div>
      </div>
    </div>
  )
}

// Export both default and named
export default AuthorBio
export { AuthorBio }
