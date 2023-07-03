import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setListings,
  setLoading,
  setTotal,
  setTotalPages,
} from '@/slice/listingSlice'

import GridView from '@/components/GridView'
import HeaderFilter from '@/components/ListingsHeader'
import usePagination from '@/hooks/usePagination'
import DashboardLayout from '@/components/DashboardLayout'
import Spinner from '@/hooks/LoadingSpinner'

export default function Home() {
  const dispatch = useDispatch()
  const { currentPage, totalPages, goToPreviousPage, goToNextPage } =
    usePagination()

  const [activeTab, setActiveTab] = useState('All Listings')
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
      dispatch(setLoading(true))
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

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen m-auto'>
        <Spinner />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col p-5 w-full'>
        <HeaderFilter setActiveTab={setActiveTab} activeTab={activeTab} />

        {activeTab === 'All Listings' ? (
          <GridView />
        ) : activeTab === 'Recently Added' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Recently added</h1>
          </article>
        ) : activeTab === 'Featured Post' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Featured post </h1>
          </article>
        ) : null}
      </main>
    </DashboardLayout>
  )
}
