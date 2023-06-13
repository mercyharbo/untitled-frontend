import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

import {
  setAddListingModal,
  setListings,
  setLoading,
  setTotal,
} from '@/slice/listingSlice'

import FilterListings from '@/components/filter'
import ListView from '@/components/ListView'
import GridView from '@/components/GridView'
import HeaderFilter from '@/components/topHeader'
import PriceRangeFilter from '@/hooks/BudgetRangeSlider'
import AddListingModal from '@/components/addListing'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

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
  const addListingModal = useSelector((state) => state.listings.addListingModal)
  const listings = useSelector((state) => state.listings.listings)

  // Filter state
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')

  // Filter handler
  const handleFilter = () => {
    // Filter your data based on the selected filters
    const filteredData = listings.filter((home) => {
      let matchesFilter = true

      // Filter by property type
      if (propertyType && home.propertyType !== propertyType) {
        matchesFilter = false
      }

      // Filter by bedrooms
      if (bedrooms && home.bedrooms !== bedrooms) {
        matchesFilter = false
      }

      // Filter by bathrooms
      if (bathrooms && home.bathrooms !== bathrooms) {
        matchesFilter = false
      }

      return matchesFilter
    })

    return filteredData // Return the filtered data
  }

  // Render the filtered data
  const filteredData = handleFilter()

  const getListings = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/listings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      if (data.status === true) {
        dispatch(setListings(data.listings))
        dispatch(setTotal(data.total))
        dispatch(setLoading(false))
      } else {
        console.log('there is an error')
      }
    } catch (error) {}
  }

  const getProtectedRoute = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:3000/api/protected', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.status === true) {
        console.log('You are authenticated')
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProtectedRoute()
    getListings()
  }, [])

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
    <>
      <Head>
        <title>
          Discover Your Dream Home: Untitlted Realty - Your Key to Extraordinary
          Properties
        </title>
        <meta
          name='description'
          content='Embark on a remarkable real estate journey with XYZ Realty. Explore a vast collection of extraordinary properties, from luxurious estates to charming starter homes. Our expert agents are ready to guide you every step of the way. Start your search today and find the perfect place to call home.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex relative  2xl:px-14 xl:px-5 lg:px-5 lg:py-10 lg:gap-5 lg:flex-row md:flex-col-reverse md:px-5 sm:px-5 sm:py-5 '>
        {mobileFilter && (
          <article className='bg-white p-5 absolute top-0 left-0 w-full h-auto z-10 '>
            <header className='flex justify-between items-center'>
              <p className='text-2xl font-semibold'>Filter</p>
              <button type='button' onClick={() => setMobileFilter(false)}>
                <FontAwesomeIcon icon={faClose} className='text-[30px]' />
              </button>
            </header>

            <article className='flex flex-col justify-start items-start gap-8 pt-8'>
              {/* <h1 className=''>Property Type</h1> */}
              <div className='flex gap-4'>
                <button
                  type='button'
                  className='bg-transparent border py-2 px-4 rounded-md'
                >
                  Housing
                </button>
                <button
                  type='button'
                  className='bg-transparent border py-2 px-4 rounded-md'
                >
                  Commercials
                </button>
                <button
                  type='button'
                  className='bg-transparent border py-2 px-4 rounded-md'
                >
                  Lands
                </button>
                <button
                  type='button'
                  className='bg-transparent border py-2 px-4 rounded-md'
                >
                  Apartment
                </button>
                <button
                  type='button'
                  className='bg-transparent border py-2 px-4 rounded-md'
                >
                  Select All
                </button>
              </div>

              <div className='flex flex-col gap-5'>
                <h1>Property Type</h1>
                <div className='flex gap-4'>
                  <button className='bg-transparent border py-2 px-4 rounded-md'>
                    Newly Built
                  </button>
                  <button className='bg-transparent border py-2 px-4 rounded-md'>
                    Used Property
                  </button>
                </div>
              </div>

              <div className='md:w-[50%] '>
                <h1 className=''> Budget </h1>
                <PriceRangeFilter />
              </div>

              <div className='flex flex-col gap-2'>
                <h1 className=''>Bedrooms</h1>
                <div className='flex gap-5'>
                  {numbers.map((num, index) => {
                    return (
                      <button
                        key={index}
                        type='button'
                        className='bg-tranparent border p-1 px-3 rounded-md'
                      >
                        {num}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <h1 className=''>Bathrooms</h1>
                <div className='flex gap-5'>
                  {numbers.map((num, index) => {
                    return (
                      <button
                        key={index}
                        type='button'
                        className='bg-tranparent border p-1 px-3 rounded-md'
                      >
                        {num}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className='flex flex-col justify-start items-start gap-2'>
                <h1 className=''>Amenities</h1>
                <div className='flex flex-col gap-3'>
                  {amenities.map((amenity) => (
                    <label key={amenity} className='grid grid-cols-2'>
                      {amenity}
                      <input
                        type='checkbox'
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className='flex justify-end items-end gap-4 w-full'>
                <button className='bg-[#F30A49] font-semibold border py-2 px-4 rounded-md'>
                  Reset
                </button>
                <button className='bg-[#F30A49] font-semibold border py-2 px-4 rounded-md'>
                  Save
                </button>
              </div>
            </article>
          </article>
        )}

        {addListingModal && <AddListingModal />}
        <section className='flex lg:flex-col lg:gap-5 xl:w-[80%] lg:w-[70%] sm:flex-col sm:gap-4 sm:w-full '>
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
            <ListView searchQuery={searchQuery} data={filteredData} />
          ) : activeTab === 'All Listings' && viewMode === 'grid' ? (
            <GridView searchQuery={searchQuery} data={filteredData} />
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
        </section>

        <section
          className={`flex bg-white shadow-2xl rounded-xl xl:w-[20%] lg:w-[30%] lg:flex lg:flex-col lg:justify-start lg:items-start lg:gap-4 md:hidden sm:hidden ${
            mobileFilter ? 'mt-72' : ''
          }`}
        >
          <FilterListings handleFilter={handleFilter} />
        </section>
      </main>
    </>
  )
}
