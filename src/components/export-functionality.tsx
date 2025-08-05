"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, FileSpreadsheet, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ExportData {
  type: "pdf" | "csv"
  name: string
  size: string
  date: Date
  status: "completed" | "processing" | "failed"
}

export function ExportFunctionality() {
  const [exportHistory, setExportHistory] = useState<ExportData[]>([
    {
      type: "pdf",
      name: "Dashboard_Report_Aug_2024.pdf",
      size: "2.4 MB",
      date: new Date(Date.now() - 3600000),
      status: "completed"
    },
    {
      type: "csv",
      name: "Campaign_Data_Aug_2024.csv",
      size: "1.8 MB",
      date: new Date(Date.now() - 7200000),
      status: "completed"
    }
  ])

  const handleExport = (type: "pdf" | "csv") => {
    const newExport: ExportData = {
      type,
      name: `${type.toUpperCase()}_Report_${new Date().toLocaleDateString().replace(/\//g, '_')}.${type}`,
      size: type === "pdf" ? "2.1 MB" : "1.5 MB",
      date: new Date(),
      status: "processing"
    }

    setExportHistory(prev => [newExport, ...prev])

    // Simulate processing
    setTimeout(() => {
      setExportHistory(prev => 
        prev.map(item => 
          item === newExport ? { ...item, status: "completed" as const } : item
        )
      )
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "pdf" ? <FileText className="h-4 w-4" /> : <FileSpreadsheet className="h-4 w-4" />
  }

  const truncateFileName = (name: string, maxLength: number = 25) => {
    if (name.length <= maxLength) return name
    const extension = name.split('.').pop()
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.'))
    const truncated = nameWithoutExt.substring(0, maxLength - 3) + '...'
    return extension ? `${truncated}.${extension}` : truncated
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-500" />
              <span className="text-sm sm:text-base">Export Reports</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 w-full sm:w-auto">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exportHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors space-y-2 sm:space-y-0"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex-shrink-0">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate" title={item.name}>
                      {truncateFileName(item.name)}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground flex-wrap">
                      <span>{item.size}</span>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge className={`${getStatusColor(item.status)} text-xs`}>
                    {item.status}
                  </Badge>
                  {item.status === "completed" && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {exportHistory.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Download className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No export history</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 