import React, { useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import CategoryFilter from "../components/Search/CategoryFilter"
import { Space } from "antd"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { searchAsync, setSearchCategory } from "../features/search/searchSlice"

type Props = {}

function SearchContainer({}: Props) {
  const dispatch = useAppDispatch()

  const categories = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  // ******
  // MAKE THE CATEGORY PERSIST
  // UPDATE DATA AND CATEGORY STATES
  // SYNC REDUX STATES WITH LOCAL STATES
  // ******

  const [selectedCategory, setSelectedCategory] = useState<string>(
    useAppSelector((state) => state.search.category)
  )

  // replace 'any' with a concrete type
  const [results, setResults] = useState<Array<any>>(
    useAppSelector((state) => state.search.data)
  )

  const [searchTerm, setSearchTerm] = useState<string>("")

  const debounceDelay: number = 1000 // in milliseconds

  // callback function for useDebounce hook
  const search = async () => {
    if (searchTerm.length >= 3) {
      const options = {
        q: searchTerm,
        per_page: 8,
      }
      console.log("search called")
      dispatch(searchAsync(selectedCategory, options))
    }
  }

  useEffect(() => {
    dispatch(setSearchCategory(selectedCategory))
    search()
  }, [selectedCategory])

  const debouncedSearch = useDebounce(search, debounceDelay)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
  }

  return (
    <Space wrap>
      <SearchField
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <CategoryFilter
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <div>
        {results?.map((result) => (
          <div key={result.id}>{result.url}</div>
        ))}
      </div>
    </Space>
  )
}

export default SearchContainer
