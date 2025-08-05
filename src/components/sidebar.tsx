"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  Menu,
  X,
  Home,
  FileText,
  Download,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: TrendingUp, label: "Campaigns", href: "/campaigns" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const userProfile = {
  name: "John Doe",
  role: "Admin",
  avatar: "",
  plan: "premium"
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard")

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "premium": return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "pro": return "bg-gradient-to-r from-blue-500 to-cyan-500"
      case "basic": return "bg-gradient-to-r from-gray-500 to-gray-600"
      default: return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 bg-background border-r border-border shadow-lg lg:relative lg:translate-x-0 lg:w-64 xl:w-80",
          !isOpen && "lg:w-16 xl:w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-3 sm:px-4 border-b border-border">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                A
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ADmyBRAND
                    </h1>
                    <p className="text-xs text-muted-foreground">Insights</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 sm:space-y-2 p-2 sm:p-4">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Button
                  variant={activeItem === item.label ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start space-x-2 sm:space-x-3 h-10 sm:h-12 text-sm",
                    !isOpen && "justify-center px-2"
                  )}
                  onClick={() => setActiveItem(item.label)}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-2 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white font-medium text-xs">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden flex-1"
                  >
                    <p className="text-sm font-medium truncate">{userProfile.name}</p>
                    <div className="flex items-center space-x-1">
                      <Badge className={`text-xs ${getPlanColor(userProfile.plan)} text-white`}>
                        {userProfile.plan}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{userProfile.role}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
} 