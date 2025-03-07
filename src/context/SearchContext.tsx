'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    gender: string
    age: number
    city: string
    image: string | null
    socials: any[]
    bio?: string
    completedRegistration: boolean
}

interface SearchContextType {
    searchResults: User[]
    setSearchResults: (results: any[]) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)

    return (
        <SearchContext.Provider value={{ 
            searchResults, 
            setSearchResults, 
            isLoading, 
            setIsLoading 
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
} 