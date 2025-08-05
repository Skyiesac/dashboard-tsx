"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Settings, LogOut, Bell, Shield, CreditCard, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfile {
  name: string
  email: string
  role: string
  avatar: string
  status: "online" | "away" | "offline"
  lastActive: string
  plan: "premium" | "pro" | "basic"
  memberSince: string
  campaigns: number
  totalRevenue: string
  performance: number
}

const dummyProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@admybrand.com",
  role: "Senior Marketing Manager",
  avatar: "",
  status: "online",
  lastActive: "2 minutes ago",
  plan: "premium",
  memberSince: "March 2023",
  campaigns: 24,
  totalRevenue: "$2.4M",
  performance: 94
}

export function Profile() {
  const [profile] = useState<UserProfile>(dummyProfile)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "premium": return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "pro": return "bg-gradient-to-r from-blue-500 to-cyan-500"
      case "basic": return "bg-gradient-to-r from-gray-500 to-gray-600"
      default: return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(profile.status)}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Profile Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{profile.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`text-xs ${getPlanColor(profile.plan)} text-white`}>
                      {profile.plan}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {profile.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-b border-border">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{profile.campaigns}</p>
                  <p className="text-xs text-muted-foreground">Campaigns</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{profile.totalRevenue}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{profile.performance}%</p>
                  <p className="text-xs text-muted-foreground">Performance</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <DropdownMenuItem className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <User className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">View Profile</p>
                  <p className="text-xs text-muted-foreground">Manage your account settings</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <Settings className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Settings</p>
                  <p className="text-xs text-muted-foreground">Configure dashboard preferences</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <Bell className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">Manage notification preferences</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <Shield className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Security</p>
                  <p className="text-xs text-muted-foreground">Password and security settings</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <CreditCard className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Billing</p>
                  <p className="text-xs text-muted-foreground">Manage subscription and billing</p>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <HelpCircle className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Help & Support</p>
                  <p className="text-xs text-muted-foreground">Get help and contact support</p>
                </div>
              </DropdownMenuItem>
            </div>

          
           
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 