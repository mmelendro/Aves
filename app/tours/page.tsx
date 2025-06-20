import { NavigationHeader } from "@/components/navigation-header"

export default function Tours() {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/tours" />

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-5">Our Tours</h1>
        <p className="text-center text-gray-600">Explore our amazing tour packages and discover your next adventure.</p>

        {/* Tour Listings (Example) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://placeimg.com/400/225/arch" alt="Tour 1" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Tour 1</h2>
              <p>This is a brief description of Tour 1.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://placeimg.com/400/225/nature" alt="Tour 2" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Tour 2</h2>
              <p>This is a brief description of Tour 2.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://placeimg.com/400/225/people" alt="Tour 3" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Tour 3</h2>
              <p>This is a brief description of Tour 3.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
