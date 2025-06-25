"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Download,
} from "lucide-react"

interface ConversionMetric {
  name: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
  format: "percentage" | "number" | "currency" | "time"
}

interface DeviceMetrics {
  device: string
  visitors: number
  conversions: number
  conversionRate: number
  icon: React.ReactNode
}

export function ConversionAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [metrics, setMetrics] = useState<ConversionMetric[]>([
    {
      name: "Overall Conversion Rate",
      value: 5.8,
      change: 12.3,
      trend: "up",
      format: "percentage",
    },
    {
      name: "Tour Page Views",
      value: 1247,
      change: -3.2,
      trend: "down",
      format: "number",
    },
    {
      name: "Contact Form Submissions",
      value: 89,
      change: 18.7,
      trend: "up",
      format: "number",
    },
    {
      name: "Average Session Duration",
      value: 4.2,
      change: 8.1,
      trend: "up",
      format: "time",
    },
    {
      name: "Bounce Rate",
      value: 32.1,
      change: -5.4,
      trend: "up",
      format: "percentage",
    },
    {
      name: "Revenue per Visitor",
      value: 127.5,
      change: 15.2,
      trend: "up",
      format: "currency",
    },
  ])

  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics[]>([
    {
      device: "Desktop",
      visitors: 3247,
      conversions: 198,
      conversionRate: 6.1,
      icon: <Monitor className="w-5 h-5" />,
    },
    {
      device: "Mobile",
      visitors: 2891,
      conversions: 144,
      conversionRate: 4.98,
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      device: "Tablet",
      visitors: 567,
      conversions: 31,
      conversionRate: 5.47,
      icon: <Tablet className="w-5 h-5" />,
    },
  ])

  const formatValue = (value: number, format: ConversionMetric["format"]) => {
    switch (format) {
      case "percentage":
        return `${value.toFixed(1)}%`
      case "currency":
        return `$${value.toFixed(2)}`
      case "time":
        return `${value.toFixed(1)}m`
      default:
        return value.toLocaleString()
    }
  }

  const getTrendIcon = (trend: ConversionMetric["trend"], change: number) => {
    if (trend === "up") {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    } else if (trend === "down") {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    }
    return null
  }

  const getTrendColor = (trend: ConversionMetric["trend"]) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Conversion Analytics</h2>
          <p className="text-gray-600">Track homepage performance and user behavior</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button size="sm" variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{formatValue(metric.value, metric.format)}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend, metric.change)}
                    <span className="ml-1 text-sm font-medium">{Math.abs(metric.change).toFixed(1)}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">vs last period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Device Performance */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Device</h3>
          <div className="space-y-4">
            {deviceMetrics.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">{device.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{device.device}</h4>
                    <p className="text-sm text-gray-600">{device.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{device.conversionRate.toFixed(2)}%</p>
                  <p className="text-sm text-gray-600">{device.conversions} conversions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Homepage Views</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">6,705</span>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <MousePointer className="w-5 h-5 text-emerald-600" />
                <span className="font-medium text-gray-900">Tour Page Views</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">1,247</span>
                <span className="text-sm text-gray-600 ml-2">(18.6%)</span>
                <div className="w-full bg-emerald-200 rounded-full h-2 mt-1">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "18.6%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-gray-900">Contact Form Views</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">423</span>
                <span className="text-sm text-gray-600 ml-2">(6.3%)</span>
                <div className="w-full bg-amber-200 rounded-full h-2 mt-1">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: "6.3%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Form Submissions</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">89</span>
                <span className="text-sm text-gray-600 ml-2">(1.3%)</span>
                <div className="w-full bg-green-200 rounded-full h-2 mt-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "1.3%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Opportunities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Opportunities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-red-900">High Mobile Bounce Rate</h4>
                <p className="text-sm text-red-700">
                  Mobile users have a 45% bounce rate vs 28% on desktop. Consider optimizing mobile layout and loading
                  speed.
                </p>
                <Badge className="bg-red-100 text-red-800 text-xs mt-2">High Priority</Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-amber-900">Form Abandonment</h4>
                <p className="text-sm text-amber-700">
                  79% of users who start the contact form don't complete it. Consider simplifying or adding progress
                  indicators.
                </p>
                <Badge className="bg-amber-100 text-amber-800 text-xs mt-2">Medium Priority</Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Strong Video Engagement</h4>
                <p className="text-sm text-blue-700">
                  Users who watch the video have 2.3x higher conversion rates. Consider making the video more prominent.
                </p>
                <Badge className="bg-blue-100 text-blue-800 text-xs mt-2">Opportunity</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
