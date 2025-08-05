"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, Users, TrendingUp, Target } from "lucide-react"
import dynamic from "next/dynamic"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { DashboardSkeleton } from "@/components/loading-skeleton"

// Lazy load heavy components for better performance
const LineChart = dynamic(() => import("@/components/charts/line-chart").then(mod => ({ default: mod.LineChart })), {
  loading: () => <div className="h-[300px] bg-muted animate-pulse rounded-lg" />
})

const BarChartComponent = dynamic(() => import("@/components/charts/bar-chart").then(mod => ({ default: mod.BarChartComponent })), {
  loading: () => <div className="h-[300px] bg-muted animate-pulse rounded-lg" />
})

const DonutChart = dynamic(() => import("@/components/charts/donut-chart").then(mod => ({ default: mod.DonutChart })), {
  loading: () => <div className="h-[300px] bg-muted animate-pulse rounded-lg" />
})

const DataTable = dynamic(() => import("@/components/data-table").then(mod => ({ default: mod.DataTable })), {
  loading: () => <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
})

const RealTimeUpdates = dynamic(() => import("@/components/real-time-updates").then(mod => ({ default: mod.RealTimeUpdates })), {
  loading: () => <div className="h-[100px] bg-muted animate-pulse rounded-lg" />
})

const ExportFunctionality = dynamic(() => import("@/components/export-functionality").then(mod => ({ default: mod.ExportFunctionality })), {
  loading: () => <div className="h-[200px] bg-muted animate-pulse rounded-lg" />
})

const AdvancedFilters = dynamic(() => import("@/components/advanced-filters").then(mod => ({ default: mod.AdvancedFilters })), {
  loading: () => <div className="h-[200px] bg-muted animate-pulse rounded-lg" />
})

const metrics = [
  {
    title: "Total Revenue",
    value: "$1,234,567",
    change: 12.5,
    icon: DollarSign,
    iconColor: "text-green-500",
    delay: 0.1,
  },
  {
    title: "Active Users",
    value: "45,678",
    change: 8.2,
    icon: Users,
    iconColor: "text-blue-500",
    delay: 0.2,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: -2.1,
    icon: TrendingUp,
    iconColor: "text-purple-500",
    delay: 0.3,
  },
  {
    title: "Target Achievement",
    value: "87.3%",
    change: 5.7,
    icon: Target,
    iconColor: "text-orange-500",
    delay: 0.4,
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back! Here&apos;s what&apos;s happening with your campaigns today.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              iconColor={metric.iconColor}
              delay={metric.delay}
            />
          ))}
        </div>

        {/* Real-Time Updates - Moved Above Filters */}
        <div className="w-full">
          <RealTimeUpdates />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LineChart />
          </div>
          <div className="lg:col-span-1">
            <DonutChart />
          </div>
          <div className="lg:col-span-3">
            <BarChartComponent />
          </div>
        </div>

        {/* Advanced Filters and Export */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <AdvancedFilters />
          </div>
          <div className="xl:col-span-1">
            <ExportFunctionality />
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <DataTable />
        </div>
      </div>
    </DashboardLayout>
  )
}
