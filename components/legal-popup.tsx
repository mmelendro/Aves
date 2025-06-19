"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Shield, Cookie, FileText } from "lucide-react"

interface LegalPopupProps {
  type: "privacy" | "terms" | "cookies"
  isOpen: boolean
  onClose: () => void
}

export function LegalPopup({ type, isOpen, onClose }: LegalPopupProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  const getContent = () => {
    switch (type) {
      case "privacy":
        return {
          icon: <Shield className="w-6 h-6" />,
          title: "Privacy Policy",
          content: (
            <div className="space-y-4 text-sm text-gray-600">
              <h3 className="font-semibold text-gray-900">Information We Collect</h3>
              <p>
                AVES Birdwatching Tours ("we," "our," or "us") collects information you provide directly to us, such as
                when you create an account, book a tour, or contact us for support.
              </p>

              <h3 className="font-semibold text-gray-900">How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
              </ul>

              <h3 className="font-semibold text-gray-900">Information Sharing</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy or as required by Canadian law.
              </p>

              <h3 className="font-semibold text-gray-900">Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction, in compliance with Canadian privacy legislation.
              </p>

              <h3 className="font-semibold text-gray-900">Your Rights</h3>
              <p>Under Canadian privacy law, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent for processing</li>
              </ul>

              <h3 className="font-semibold text-gray-900">Contact Information</h3>
              <p>
                If you have questions about this Privacy Policy, please contact us at privacy@aves-tours.com or by mail
                at our registered office address.
              </p>

              <p className="text-xs text-gray-500 mt-4">
                This policy complies with the Personal Information Protection and Electronic Documents Act (PIPEDA) and
                applicable provincial privacy legislation.
              </p>
            </div>
          ),
        }

      case "terms":
        return {
          icon: <FileText className="w-6 h-6" />,
          title: "Terms of Service",
          content: (
            <div className="space-y-4 text-sm text-gray-600">
              <h3 className="font-semibold text-gray-900">Acceptance of Terms</h3>
              <p>
                By accessing and using AVES Birdwatching Tours services, you accept and agree to be bound by the terms
                and provision of this agreement.
              </p>

              <h3 className="font-semibold text-gray-900">Booking and Payment</h3>
              <p>All bookings are subject to availability and confirmation. Payment terms:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>50% deposit required upon booking confirmation</li>
                <li>Full payment due 30 days before tour departure</li>
                <li>Prices are in Canadian dollars unless otherwise specified</li>
                <li>All taxes and fees are included in quoted prices</li>
              </ul>

              <h3 className="font-semibold text-gray-900">Cancellation Policy</h3>
              <p>Cancellation fees apply as follows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>More than 60 days: Full refund minus 10% processing fee</li>
                <li>30-60 days: 50% refund</li>
                <li>Less than 30 days: No refund</li>
                <li>Emergency cancellations may be considered on a case-by-case basis</li>
              </ul>

              <h3 className="font-semibold text-gray-900">Liability and Insurance</h3>
              <p>
                Participants are strongly advised to obtain comprehensive travel insurance. AVES Birdwatching Tours
                maintains liability insurance as required by Canadian law but recommends additional coverage for
                international travel.
              </p>

              <h3 className="font-semibold text-gray-900">Health and Safety</h3>
              <p>
                Participants must disclose any medical conditions that may affect their ability to participate safely.
                Tours involve outdoor activities that may present inherent risks.
              </p>

              <h3 className="font-semibold text-gray-900">Governing Law</h3>
              <p>
                These terms are governed by the laws of Canada and the province in which our business is registered. Any
                disputes will be resolved through Canadian courts or arbitration as applicable.
              </p>

              <p className="text-xs text-gray-500 mt-4">
                Last updated: January 2025. We reserve the right to modify these terms with reasonable notice.
              </p>
            </div>
          ),
        }

      case "cookies":
        return {
          icon: <Cookie className="w-6 h-6" />,
          title: "Cookie Policy",
          content: (
            <div className="space-y-4 text-sm text-gray-600">
              <h3 className="font-semibold text-gray-900">What Are Cookies</h3>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit our
                website. They help us provide you with a better experience by remembering your preferences and
                understanding how you use our site.
              </p>

              <h3 className="font-semibold text-gray-900">Types of Cookies We Use</h3>
              <div className="space-y-2">
                <p>
                  <strong>Essential Cookies:</strong> Required for the website to function properly, including security
                  and accessibility features.
                </p>
                <p>
                  <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by
                  collecting anonymous information.
                </p>
                <p>
                  <strong>Functional Cookies:</strong> Remember your preferences and provide enhanced features and
                  personalization.
                </p>
                <p>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track the
                  effectiveness of our marketing campaigns.
                </p>
              </div>

              <h3 className="font-semibold text-gray-900">Third-Party Cookies</h3>
              <p>We may use third-party services that place cookies on your device, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Google Analytics for website performance analysis</li>
                <li>Social media platforms for content sharing</li>
                <li>Payment processors for secure transactions</li>
              </ul>

              <h3 className="font-semibold text-gray-900">Managing Cookies</h3>
              <p>
                You can control and manage cookies through your browser settings. However, disabling certain cookies may
                affect the functionality of our website.
              </p>

              <h3 className="font-semibold text-gray-900">Consent</h3>
              <p>
                By continuing to use our website, you consent to our use of cookies as described in this policy. You can
                withdraw your consent at any time by adjusting your browser settings.
              </p>

              <h3 className="font-semibold text-gray-900">Updates to This Policy</h3>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an
                updated revision date.
              </p>

              <p className="text-xs text-gray-500 mt-4">
                This policy complies with Canadian privacy legislation and international best practices for cookie
                management.
              </p>
            </div>
          ),
        }

      default:
        return { icon: null, title: "", content: null }
    }
  }

  const { icon, title, content } = getContent()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">{content}</CardContent>
        <div className="p-6 pt-0">
          <Button onClick={onClose} className="w-full">
            I Understand
          </Button>
        </div>
      </Card>
    </div>
  )
}
