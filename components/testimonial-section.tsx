"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  tour: string
  image: string
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
  className?: string
}

function TestimonialSection({ testimonials, className }: TestimonialSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={cn("w-4 h-4", index < rating ? "text-yellow-400 fill-current" : "text-gray-300")} />
    ))
  }

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 bg-yellow-100 text-yellow-800">
          Guest Experiences
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from fellow birders who have experienced the magic of Colombian avifauna with AVES
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1">{renderStars(testimonial.rating)}</div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-center italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder-user.jpg"
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {testimonial.tour}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Create Your Own Story?</h3>
          <p className="text-gray-600 mb-4">
            Join hundreds of satisfied birders who have discovered Colombia's incredible avifauna with AVES
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">4.9/5 from 200+ reviews</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection
export { TestimonialSection }
