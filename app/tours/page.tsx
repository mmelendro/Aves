import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CookieManagementLink } from "@/components/cookie-management-button"

export default function ToursPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Explore Our Tours</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Featured Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Adventure in the Amazon</CardTitle>
              <CardDescription>A thrilling journey into the heart of the rainforest.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discover exotic wildlife, navigate winding rivers, and immerse yourself in indigenous cultures.</p>
            </CardContent>
            <CardFooter>
              <Button>Book Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safari in Serengeti</CardTitle>
              <CardDescription>Witness the Great Migration in Tanzania.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Experience the thrill of seeing lions, elephants, and zebras in their natural habitat.</p>
            </CardContent>
            <CardFooter>
              <Button>Book Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hiking in the Himalayas</CardTitle>
              <CardDescription>Conquer breathtaking peaks and valleys.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Challenge yourself with stunning views and unforgettable experiences.</p>
            </CardContent>
            <CardFooter>
              <Button>Book Now</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Find Your Perfect Tour</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input type="text" id="destination" placeholder="Enter destination" />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <DatePicker>
              <Button variant={"outline"} className="w-[300px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Pick a date</span>
              </Button>
            </DatePicker>
          </div>
        </div>
        <Button className="mt-5">Search Tours</Button>
      </section>

      <footer className="border-t py-6 mt-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p>&copy; 2024 Adventure Tours</p>
          </div>
          <div className="space-x-4">
            <Link href="/about" className="hover:text-emerald-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
              Privacy Policy
            </Link>
            <CookieManagementLink className="hover:text-emerald-600 transition-colors">
              Cookie Preferences
            </CookieManagementLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
