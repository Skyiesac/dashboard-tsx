"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Organic", value: 400 },
  { name: "Direct", value: 300 },
  { name: "Social", value: 500 },
  { name: "Email", value: 200 },
  { name: "Referral", value: 350 },
  { name: "Paid", value: 450 },
]

const gradients = [
  ["#10b981", "#059669"], // Organic
  ["#3b82f6", "#2563eb"], // Direct
  ["#8b5cf6", "#7c3aed"], // Social
  ["#f59e0b", "#d97706"], // Email
  ["#ef4444", "#dc2626"], // Referral
  ["#06b6d4", "#0891b2"], // Paid
]

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-md border bg-background px-4 py-3 shadow-xl backdrop-blur-sm"
      >
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-xl font-bold text-foreground">{payload[0].value}</p>
        <p className="text-xs text-muted-foreground">Users acquired</p>
      </motion.div>
    )
  }
  return null
}

export function BarChartComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-muted/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            User Acquisition by Channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                {gradients.map(([from, to], index) => (
                  <linearGradient id={`barGradient-${index}`} key={index} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={from} stopOpacity={0.85} />
                    <stop offset="100%" stopColor={to} stopOpacity={0.95} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#barGradient-${index})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
