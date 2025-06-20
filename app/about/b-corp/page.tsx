import { NavigationHeader } from "@/components/navigation-header"

export default function BCorpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/about/b-corp" />

      <div className="container max-w-7xl mt-24 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">B Corp Certification</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What is a B Corp?</h2>
          <p className="text-gray-700">
            B Corp certification is a designation that a business is meeting high standards of verified performance,
            accountability, and transparency on factors from employee benefits and charitable giving to supply chain
            practices and input materials.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why We Became a B Corp</h2>
          <p className="text-gray-700">
            We believe in using business as a force for good. Becoming a B Corp aligns with our values and demonstrates
            our commitment to social and environmental responsibility.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-700">
            We are committed to continuously improving our impact on the environment, our employees, and the community.
            We strive to operate in a way that benefits all stakeholders, not just shareholders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
          <p className="text-gray-700">
            Visit the official B Corp website to learn more about the B Corp movement and its impact:{" "}
            <a
              href="https://www.bcorporation.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              B Corporation
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
