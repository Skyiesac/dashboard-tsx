"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, CheckCircle, AlertCircle, Info, Clock, User, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ReactNode
}

const dummyNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Campaign Completed",
    message: "Summer Sale 2024 campaign has reached its target with 125% performance.",
    time: "2 minutes ago",
    read: false,
    icon: <CheckCircle className="h-4 w-4 text-green-500" />
  },
  {
    id: "2",
    type: "warning",
    title: "Budget Alert",
    message: "Brand Awareness Q1 campaign is approaching 80% of allocated budget.",
    time: "15 minutes ago",
    read: false,
    icon: <AlertCircle className="h-4 w-4 text-yellow-500" />
  },
  {
    id: "3",
    type: "info",
    title: "New User Signup",
    message: "John Smith from TechCorp has signed up for premium analytics.",
    time: "1 hour ago",
    read: true,
    icon: <User className="h-4 w-4 text-blue-500" />
  },
  {
    id: "4",
    type: "success",
    title: "Revenue Milestone",
    message: "Monthly revenue target achieved! $1.2M in August 2024.",
    time: "3 hours ago",
    read: true,
    icon: <DollarSign className="h-4 w-4 text-green-500" />
  },
  {
    id: "5",
    type: "info",
    title: "System Update",
    message: "New analytics features have been deployed. Check out the enhanced reporting.",
    time: "5 hours ago",
    read: true,
    icon: <Info className="h-4 w-4 text-blue-500" />
  },
  {
    id: "6",
    type: "success",
    title: "Performance Boost",
    message: "Conversion rate improved by 15% across all active campaigns.",
    time: "1 day ago",
    read: true,
    icon: <TrendingUp className="h-4 w-4 text-green-500" />
  }
]

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "error": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "info": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span>Notifications</span>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs h-6 px-2"
                  >
                    Mark all read
                  </Button>
                )}
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 text-center text-muted-foreground"
                  >
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </motion.div>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                        !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-1">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getTypeColor(notification.type)}`}
                              >
                                {notification.type}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{notification.time}</span>
                            </div>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-6 px-2 text-blue-600 hover:text-blue-700"
                              >
                                Mark read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 