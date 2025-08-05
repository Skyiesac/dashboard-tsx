"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilters } from "@/contexts/filter-context"

const data = [
  {
    id: 1,
    campaign: "Summer Sale 2024",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 125000,
    clicks: 8500,
    conversions: 425,
    ctr: 6.8,
    cpc: 0.38,
    type: "social",
    startDate: "2024-06-01",
    endDate: "2024-08-31"
  },
  {
    id: 2,
    campaign: "Brand Awareness Q1",
    status: "paused",
    budget: 3000,
    spent: 1800,
    impressions: 89000,
    clicks: 5200,
    conversions: 260,
    ctr: 5.8,
    cpc: 0.35,
    type: "display",
    startDate: "2024-01-01",
    endDate: "2024-03-31"
  },
  {
    id: 3,
    campaign: "Product Launch",
    status: "active",
    budget: 8000,
    spent: 6500,
    impressions: 210000,
    clicks: 15000,
    conversions: 750,
    ctr: 7.1,
    cpc: 0.43,
    type: "search",
    startDate: "2024-07-01",
    endDate: "2024-09-30"
  },
  {
    id: 4,
    campaign: "Holiday Special",
    status: "completed",
    budget: 6000,
    spent: 6000,
    impressions: 180000,
    clicks: 12000,
    conversions: 600,
    ctr: 6.7,
    cpc: 0.50,
    type: "email",
    startDate: "2024-11-01",
    endDate: "2024-12-31"
  },
  {
    id: 5,
    campaign: "Retargeting Campaign",
    status: "active",
    budget: 2500,
    spent: 1200,
    impressions: 45000,
    clicks: 3800,
    conversions: 190,
    ctr: 8.4,
    cpc: 0.32,
    type: "social",
    startDate: "2024-08-01",
    endDate: "2024-10-31"
  },
]

type SortField = "campaign" | "budget" | "spent" | "impressions" | "clicks" | "conversions" | "ctr" | "cpc"
type SortDirection = "asc" | "desc"

export function DataTable() {
  const { filters } = useFilters()
  const [sortField, setSortField] = useState<SortField>("campaign")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(item => {
      // Search filter
      if (filters.searchTerm && !item.campaign.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false
      }

      // Status filter
      if (filters.status !== "all" && item.status !== filters.status) {
        return false
      }

      // Campaign type filter
      if (filters.campaignType !== "all" && item.type !== filters.campaignType) {
        return false
      }

      // Budget range filter
      if (filters.minBudget > 0 && item.budget < filters.minBudget) {
        return false
      }
      if (filters.maxBudget > 0 && item.budget > filters.maxBudget) {
        return false
      }

      // Conversion filter
      if (filters.minConversion > 0 && item.ctr < filters.minConversion) {
        return false
      }

      // Active only filter
      if (filters.showOnlyActive && item.status !== "active") {
        return false
      }

      // Date range filter
      if (filters.dateRange.start && item.startDate < filters.dateRange.start) {
        return false
      }
      if (filters.dateRange.end && item.endDate > filters.dateRange.end) {
        return false
      }

      return true
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return sortDirection === "asc" 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return filtered
  }, [filters, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <span className="text-lg sm:text-xl">Campaign Performance</span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={filters.searchTerm}
                  onChange={(e) => filters.searchTerm = e.target.value}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={filters.status} onValueChange={(value) => filters.status = value}>
                <SelectTrigger className="w-full sm:w-32">
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("campaign")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      Campaign
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("budget")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      Budget
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[80px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("spent")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      Spent
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("impressions")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      Impressions
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[80px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("clicks")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      Clicks
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("conversions")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      Conversions
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[60px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("ctr")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      CTR
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[60px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("cpc")}
                      className="h-auto p-0 font-semibold text-xs sm:text-sm"
                    >
                      CPC
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {paginatedData.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium text-xs sm:text-sm">{row.campaign}</TableCell>
                      <TableCell>{getStatusBadge(row.status)}</TableCell>
                      <TableCell className="text-xs sm:text-sm">${row.budget.toLocaleString()}</TableCell>
                      <TableCell className="text-xs sm:text-sm">${row.spent.toLocaleString()}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{row.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{row.clicks.toLocaleString()}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{row.conversions.toLocaleString()}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{row.ctr}%</TableCell>
                      <TableCell className="text-xs sm:text-sm">${row.cpc}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-2 sm:space-y-0">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of{" "}
              {filteredAndSortedData.length} results
            </p>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 px-2 sm:px-3"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 