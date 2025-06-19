"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Shield } from "lucide-react"

interface PaymentIntegrationProps {
  amount: number
  depositAmount: number
  finalAmount: number
  onPaymentSuccess?: () => void
}

export function PaymentIntegration({ amount, depositAmount, finalAmount, onPaymentSuccess }: PaymentIntegrationProps) {
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    setProcessing(true)

    // Stripe integration would go here
    // For now, we'll simulate the process
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (onPaymentSuccess) {
        onPaymentSuccess()
      }
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Card className="border-emerald-200">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-emerald-600 mr-2" />
          <h3 className="font-semibold">Secure Payment</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Deposit (30%)</span>
              <span className="text-xl font-bold text-emerald-600">${depositAmount.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Due today to secure your booking</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Final Payment (70%)</span>
              <span className="text-xl font-bold text-gray-600">${finalAmount.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Due 30 days before departure</p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {processing ? "Processing..." : `Pay Deposit $${depositAmount.toLocaleString()}`}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            <p>Secured by Stripe • PCI DSS Compliant</p>
            <p>Free cancellation up to 60 days before departure</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
