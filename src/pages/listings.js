import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'

import {
  setListings,
  setLoading,
  setTotal,
  setTotalPages,
} from '@/slice/listingSlice'

import ListView from '@/components/ListView'
import GridView from '@/components/GridView'
import HeaderFilter from '@/components/topHeader'
import usePagination from '@/hooks/usePagination'
import DashboardLayout from '@/components/DashboardLayout'

export default function Home() {
  const dispatch = useDispatch()
  const { currentPage, totalPages, goToPreviousPage, goToNextPage } =
    usePagination()

  const [activeTab, setActiveTab] = useState('All Listings')
  const [viewMode, setViewMode] = useState('list')

  const loading = useSelector((state) => state.listings.loading)

  // const getProtectedRoute = async () => {
  //   const token = localStorage.getItem('token')
  //   try {
  //     const response = await fetch(
  //       `${process.env.API_ENDPOINT_RENDER}/api/protected`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )

  //     const data = await response.json()
  //     if (data.status === true) {
  //       console.log('You are authenticated')
  //     } else {
  //       router.push('/login')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    const getListings = async (page) => {
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT_RENDER}/api/listings?page=${page}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()

        if (data.status === true) {
          dispatch(setListings(data.listings))
          dispatch(setTotal(data.total))
          dispatch(setLoading(false))
          dispatch(setTotalPages(data.totalPages))
        } else {
          console.log('there is an error')
        }
      } catch (error) {
        console.error(error)
      }
    }

    getListings(currentPage)
  }, [currentPage])

  const handleListViewClick = () => {
    setViewMode('list')
  }

  const handleGridViewClick = () => {
    setViewMode('grid')
  }

  if (loading) {
    return <p className='text.3xl font-bold'>Loading...</p>
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col p-5 w-full'>
        <HeaderFilter
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          handleGridViewClick={handleGridViewClick}
          handleListViewClick={handleListViewClick}
        />

        {activeTab === 'All Listings' && viewMode === 'list' ? (
          <ListView />
        ) : activeTab === 'All Listings' && viewMode === 'grid' ? (
          <GridView />
        ) : activeTab === 'Recently Added' && viewMode === 'list' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Recently added</h1>
          </article>
        ) : activeTab === 'Recently Added' && viewMode === 'grid' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Recently added grid</h1>
          </article>
        ) : activeTab === 'Featured' && viewMode === 'list' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Featured post </h1>
          </article>
        ) : activeTab === 'Featured' && viewMode === 'grid' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Featured post grid </h1>
          </article>
        ) : null}
      </main>
    </DashboardLayout>
  )
}
