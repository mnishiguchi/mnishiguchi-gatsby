import React from 'react'

// https://www.gatsbyjs.org/packages/gatsby-plugin-flexsearch
function useBlogPostSearch() {
  const [query, setQuery] = React.useState('')
  const [suggestions, setsuggestions] = React.useState([])

  const fetchSearchsuggestions = (query) => {
    const index = window.__FLEXSEARCH__.en.index
    const store = window.__FLEXSEARCH__.en.store

    if (!query || !index) return []

    let results = []
    Object.keys(index).forEach((idx) =>
      results.push(...index[idx].values.search(query))
    )
    results = Array.from(new Set(results))

    return store
      .filter((node) => results.includes(node.id))
      .map((node) => node.node)
  }

  const onSearch = (event) => {
    const inputValue = event.target.value
    setQuery(inputValue)
    setsuggestions(
      inputValue.length > 2 ? fetchSearchsuggestions(inputValue) : []
    )
  }

  const clearQuery = () => {
    setQuery('')
    setsuggestions([])
  }

  return {
    clearQuery,
    onSearch,
    query,
    suggestions,
  }
}

export default useBlogPostSearch
