"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FilterState {
  dateRange: {
    start: string
    end: string
  }
  campaignType: string
  status: string
  minBudget: number
  maxBudget: number
  minConversion: number
  showOnlyActive: boolean
  searchTerm: string
}

interface FilterContextType {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  updateFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void
  clearFilters: () => void
  activeFilters: string[]
  setActiveFilters: (filters: string[]) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const defaultFilters: FilterState = {
  dateRange: {
    start: "",
    end: ""
  },
  campaignType: "all",
  status: "all",
  minBudget: 0,
  maxBudget: 0,
  minConversion: 0,
  showOnlyActive: false,
  searchTerm: ""
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    setActiveFilters([])
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        clearFilters,
        activeFilters,
        setActiveFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
} 