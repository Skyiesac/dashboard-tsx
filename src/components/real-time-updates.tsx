"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, WifiOff, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UpdateData {
  id: string
  type: "revenue" | "users" | "conversions" | "campaign"
  message: string
  value: string
  timestamp: Date
  status: "success" | "warning" | "error"
}

export function RealTimeUpdates() {
  const [updates, setUpdates] = useState<UpdateData[]>([])
  const [isConnected, setIsConnected] = useState(true)

  const generateUpdate = (): UpdateData => {
    const types = ["revenue", "users", "conversions", "campaign"] as const
    const statuses = ["success", "warning", "error"] as const
    const type = types[Math.floor(Math.random() * types.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    const messages = {
      revenue: [
        "New sale completed",
        "Revenue milestone reached",
        "Payment processed",
        "Subscription renewed"
      ],
      users: [
        "New user registered",
        "User completed onboarding",
        "Active user milestone",
        "User engagement increased"
      ],
      conversions: [
        "Lead converted to customer",
        "Conversion rate improved",
        "New conversion milestone",
        "Campaign conversion success"
      ],
      campaign: [
        "Campaign performance improved",
        "New campaign launched",
        "Campaign budget updated",
        "Campaign target reached"
      ]
    }

    const values = {
      revenue: ["$1,234", "$5,678", "$12,345", "$2,500"],
      users: ["+15", "+23", "+8", "+45"],
      conversions: ["+2.3%", "+1.8%", "+5.2%", "+3.1%"],
      campaign: ["+12%", "+8%", "+15%", "+22%"]
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message: messages[type][Math.floor(Math.random() * messages[type].length)],
      value: values[type][Math.floor(Math.random() * values[type].length)],
      timestamp: new Date(),
      status
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        const newUpdate = generateUpdate()
        setUpdates(prev => [newUpdate, ...prev.slice(0, 4)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isConnected])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "revenue":
        return "💰"
      case "users":
        return "👥"
      case "conversions":
        return "📈"
      case "campaign":
        return "🎯"
      default:
        return "📊"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Real-Time Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <Badge variant={isConnected ? "default" : "destructive"}>
                {isConnected ? "Live" : "Offline"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {updates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getTypeIcon(update.type)}</span>
                    <div>
                      <p className="text-sm font-medium">{update.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {update.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(update.status)}>
                      {update.status}
                    </Badge>
                    <span className="text-sm font-bold text-green-600">
                      {update.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {updates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Waiting for updates...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 