"use client"

import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Completed", value: 65, color: "#10b981" },
  { name: "In Progress", value: 20, color: "#f59e0b" },
  { name: "Pending", value: 15, color: "#ef4444" },
]

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    payload: {
      name: string
      value: number
    }
  }>
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-border rounded-lg p-3 shadow-lg"
      >
        <p className="font-medium">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>
          {payload[0].value}%
        </p>
      </motion.div>
    )
  }
  return null
}

interface LegendProps {
  payload?: Array<{
    color: string
    value: string
  }>
}

const CustomLegend = ({ payload }: LegendProps) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {payload?.map((entry, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </motion.div>
      ))}
    </div>
  )
}

export function DonutChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle>Conversion Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={2000}
                  animationBegin={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 