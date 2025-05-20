import React, {createContext, useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useProducts} from './ProductContext'

const SearchContext = createContext()
export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({children}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const {products}= useProducts()
    console.log('SearchProvider initializing, products =', products);
    
    const navigate = useNavigate()

    //Content-based filtering (Search algorithm)
    const getSimilarScore = (product, query) => {
        const combined = `${product.name} ${product.brand}`.toLowerCase()
        const terms = query.toLowerCase().split(' ').filter(t => t)
        return terms.reduce((score, term) => combined.includes(term) ? score +1 : score, 0)
    }
    const handleSearch = () => {
        if (!searchQuery.trim())
            return
        const results = products
            .map(product => ({...product, score: getSimilarScore(product, searchQuery)}))
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
        navigate('/search', {state: {results, query: searchQuery}})
    }
  return (
    <SearchContext.Provider value={{searchQuery, setSearchQuery, handleSearch, }}>
        {children}
    </SearchContext.Provider>
  )
}
