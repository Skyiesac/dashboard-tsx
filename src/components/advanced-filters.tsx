"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Calendar, X, Search, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useFilters } from "@/contexts/filter-context"

export function AdvancedFilters() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { filters, updateFilter, activeFilters, setActiveFilters, clearFilters } = useFilters()

  const handleFilterChange = (key: string, value: string | number | boolean) => {
    updateFilter(key as any, value)
  }

  const handleApplyFilters = () => {
    const newActiveFilters: string[] = []
    
    if (filters.dateRange.start && filters.dateRange.end) {
      newActiveFilters.push("Date Range")
    }
    if (filters.campaignType !== "all") {
      newActiveFilters.push("Campaign Type")
    }
    if (filters.status !== "all") {
      newActiveFilters.push("Status")
    }
    if (filters.minBudget > 0 || filters.maxBudget > 0) {
      newActiveFilters.push("Budget Range")
    }
    if (filters.minConversion > 0) {
      newActiveFilters.push("Min Conversion")
    }
    if (filters.showOnlyActive) {
      newActiveFilters.push("Active Only")
    }
    if (filters.searchTerm) {
      newActiveFilters.push("Search")
    }

    setActiveFilters(newActiveFilters)
  }

  const removeFilter = (filterName: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filterName))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-purple-500" />
              <span>Advanced Filters</span>
              {activeFilters.length > 0 && (
                <Badge variant="secondary">{activeFilters.length} active</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter, index) => (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>{filter}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(filter)}
                    />
                  </Badge>
                </motion.div>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}

          {/* Filter Form */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date Range */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleFilterChange("dateRange", { ...filters.dateRange, start: e.target.value })}
                    placeholder="Start date"
                  />
                  <Input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleFilterChange("dateRange", { ...filters.dateRange, end: e.target.value })}
                    placeholder="End date"
                  />
                </div>
              </div>

              {/* Campaign Type */}
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select value={filters.campaignType} onValueChange={(value) => handleFilterChange("campaignType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="search">Search Ads</SelectItem>
                    <SelectItem value="display">Display Ads</SelectItem>
                    <SelectItem value="email">Email Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget Range</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minBudget || ""}
                    onChange={(e) => handleFilterChange("minBudget", parseFloat(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxBudget || ""}
                    onChange={(e) => handleFilterChange("maxBudget", parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Min Conversion */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Min Conversion %</span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 2.5"
                  value={filters.minConversion || ""}
                  onChange={(e) => handleFilterChange("minConversion", parseFloat(e.target.value) || 0)}
                />
              </div>

              {/* Search */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Label>
                <Input
                  placeholder="Search campaigns..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                />
              </div>
            </div>

            {/* Show Only Active Switch */}
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                id="active-only"
                checked={filters.showOnlyActive}
                onCheckedChange={(checked) => handleFilterChange("showOnlyActive", checked)}
              />
              <Label htmlFor="active-only">Show only active campaigns</Label>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end mt-4">
              <Button onClick={handleApplyFilters} className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Apply Filters</span>
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 