"use client"
import FavouritePlaces from "./favourite-places"
import CompareSavedTrips from "./compare-saved-trips"
import type {TripPlan} from "./account-api"
export default function SavedTripTools({plans,onSaved}:{plans:TripPlan[];onSaved:(plan:TripPlan)=>void}){
 return <div className="space-y-8 rounded-2xl border border-emerald-200 bg-white p-5 sm:p-7"><FavouritePlaces plans={plans} onSaved={onSaved}/><CompareSavedTrips plans={plans}/></div>
}
