"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialSectionProps {
  testimonial: {
    text: string
    author: string
    role: string
  }
}

export default function TestimonialSection({ testimonial }: TestimonialSectionProps) {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              {/* Quote Icon */}
              <div className="mx-auto mb-6 p-4 bg-orange-100 rounded-full w-fit">
                <Quote className="w-8 h-8 text-orange-600" />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-lg font-bold text-gray-900 mb-1">{testimonial.author}</p>
                <p className="text-sm text-gray-600 uppercase tracking-wide">{testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
