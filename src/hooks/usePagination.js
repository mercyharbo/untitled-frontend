import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useSelector((state) => state.listings.totalPages)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page whenever totalPages changes
  }, [totalPages])

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
    window.scrollTo(0, 0) // Scroll to top of the page
  }

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    window.scrollTo(0, 0) // Scroll to top of the page
  }

  return {
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
  }
}

export default usePagination
