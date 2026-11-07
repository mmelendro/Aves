import Image from "next/image"

function AuthorBio() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-12">
      <div className="flex items-start space-x-4">
        <Image
          src="/images/martin-melendro.jpg"
          alt="Martín Melendro"
          width={80}
          height={80}
          className="rounded-full object-cover flex-shrink-0"
        />
        <div>
          <h3 className="font-bold text-gray-900 mb-2">About Martín Melendro</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Martín Melendro is developing AVES, bringing together his interests in birdlife, nature and thoughtful travel.
          </p>
        </div>
      </div>
    </div>
  )
}

// Export both default and named
export default AuthorBio
export { AuthorBio }
