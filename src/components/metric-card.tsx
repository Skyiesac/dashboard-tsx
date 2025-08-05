"use client"

import { motion } from "framer-motion"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
  iconColor?: string
  delay?: number
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = "text-blue-500",
  delay = 0 
}: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/20 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">{value}</p>
              <div className="flex items-center space-x-1 flex-wrap">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                )}
                <span className={cn(
                  "text-xs sm:text-sm font-medium",
                  isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {isPositive ? "+" : ""}{change}%
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">vs last month</span>
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
              className={cn(
                "p-2 sm:p-3 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex-shrink-0 ml-2",
                iconColor
              )}
            >
              <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.div>
          </div>
          
          {/* Animated background gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: delay + 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
} 