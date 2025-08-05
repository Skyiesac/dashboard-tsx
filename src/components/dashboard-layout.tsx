"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import { Notifications } from "@/components/notifications"
import { Profile } from "@/components/profile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden" role="application" aria-label="Dashboard">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6"
          role="banner"
          aria-label="Dashboard header"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar menu"
              aria-expanded={sidebarOpen}
              aria-controls="sidebar"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
            
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search..."
                className="pl-10 w-60 lg:w-80"
                aria-label="Search dashboard content"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Notifications />
            <Profile />
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto" role="main" aria-label="Dashboard content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
} 