import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faClose,
} from '@fortawesome/free-solid-svg-icons'

import {
  setListings,
  setLoading,
  setTotal,
  setTotalPages,
} from '@/slice/listingSlice'

import FilterListings from '@/components/filter'
import ListView from '@/components/ListView'
import GridView from '@/components/GridView'
import HeaderFilter from '@/components/topHeader'
import PriceRangeFilter from '@/hooks/BudgetRangeSlider'
import usePagination from '@/hooks/usePagination'
import DashboardLayout from '@/components/DashboardLayout'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentPage, totalPages, goToPreviousPage, goToNextPage } =
    usePagination()

  const numbers = [1, 2, 3, 4, 5]

  const amenities = [
    'Swimming pool',
    'Garden',
    'Garage',
    'Fireplace',
    'Balcony',
    'Fitness center',
    'Home theater',
    'Study room',
    'Laundry room',
    'Walk-in closet',
    'Smart home technology',
    'Security system',
    'Outdoor BBQ area',
    'Spa or hot tub',
    'Game room',
  ]

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All Listings')
  const [viewMode, setViewMode] = useState('list')
  const [mobileFilter, setMobileFilter] = useState(false)

  const [selectedAmenities, setSelectedAmenities] = useState([])

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

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  if (loading) {
    return <p className='text.3xl font-bold'>Loading...</p>
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col p-5'>
        <HeaderFilter
          setActiveTab={setActiveTab}
          setMobileFilter={setMobileFilter}
          activeTab={activeTab}
          searchQuery={searchQuery}
          handleGridViewClick={handleGridViewClick}
          handleListViewClick={handleListViewClick}
          setSearchQuery={setSearchQuery}
        />

        {activeTab === 'All Listings' && viewMode === 'list' ? (
          <ListView searchQuery={searchQuery} />
        ) : activeTab === 'All Listings' && viewMode === 'grid' ? (
          <GridView searchQuery={searchQuery} />
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

        <div className='flex justify-between items-center mx-auto xl:w-[30%] md:w-full sm:w-full  '>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              className='text-[30px]'
            />
          </button>
          <span className='font-semibold'>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className='text-[30px]'
            />
          </button>
        </div>
      </main>
    </DashboardLayout>
  )
}
