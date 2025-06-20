import { NavigationHeader } from "@/components/navigation-header"

export default function AdventureToursPage() {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/tours/adventure" />

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-5">Adventure Tours</h1>
        <p className="text-center text-gray-600">Explore our exciting adventure tours and discover new horizons.</p>

        {/* Add adventure tour content here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b586aa.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Mountain Climbing</h2>
              <p>Scale the heights and conquer the peaks with our guided mountain climbing tours.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b586aa.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Jungle Trekking</h2>
              <p>Immerse yourself in the lush rainforest and discover hidden wonders on our jungle treks.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b586aa.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">White Water Rafting</h2>
              <p>Experience the thrill of navigating raging rivers on our white water rafting adventures.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
