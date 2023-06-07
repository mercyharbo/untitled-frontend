import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faBed,
  faBuilding,
  faList,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'

import { setListings, setLoading } from '@/slice/listingSlice'
import Head from 'next/head'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All Listings')

  const [viewMode, setViewMode] = useState('list')
  console.log(viewMode, 'as view mode')

  const loading = useSelector((state) => state.listings.loading)
  const listings = useSelector((state) => state.listings.listings)
  // const token = useSelector((state) => state.user.token)

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

  if (loading) {
    return <p className='text.3xl font-bold'>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>
          {' '}
          Discover Your Dream Home: Untitlted Realty - Your Key to Extraordinary
          Properties
        </title>
        <meta
          name='description'
          content='Embark on a remarkable real estate journey with XYZ Realty. Explore a vast collection of extraordinary properties, from luxurious estates to charming starter homes. Our expert agents are ready to guide you every step of the way. Start your search today and find the perfect place to call home.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex  2xl:px-14 xl:px-10 lg:px-10 lg:py-10 lg:gap-5 md:px-5 sm:px-5 sm:py-5 '>
        <section className='flex lg:flex-col lg:gap-5 lg:w-[70%] sm:flex-col sm:gap-4 sm:w-full '>
          <article className='tabs flex lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:gap-5 '>
            <div className='flex lg:flex-row lg:justify-start lg:items-center md:justify-start md:items-center md:gap-8 sm:flex-row sm:justify-between sm:gap-5'>
              <button
                onClick={() => setActiveTab('All Listings')}
                className={`lg:text-lg font-semibold relative ${
                  activeTab === 'All Listings'
                    ? 'text-[#023047] absolute lg:after:w-1/2 lg:after:h-[10px] md:after:top-10 sm:after:top-7 border-b-4 border-[#023047] lg:after:top-4 left-0 '
                    : ''
                }`}
              >
                All Listings
              </button>
              <button
                onClick={() => setActiveTab('Recently Added')}
                className={`lg:text-lg font-semibold ${
                  activeTab === 'Recently Added'
                    ? 'text-[#023047] relative after:absolute after:w-1/2 after:h-[10px] border-b-4 border-[#023047] after:top-4 left-0 '
                    : ''
                }`}
              >
                Recently Added
              </button>
              <button
                onClick={() => setActiveTab('Featured')}
                className={`lg:text-lg font-semibold ${
                  activeTab === 'Featured'
                    ? 'text-[#023047] relative after:absolute after:w-1/2 after:h-[10px] border-b-4 border-[#023047] after:top-4 left-0 '
                    : ''
                }`}
              >
                Featured
              </button>
            </div>

            <div className='relative'>
              <input
                type='text'
                name='search'
                placeholder='Search property'
                className='lg:h-[45px] lg:w-[350px] sm:w-full sm:h-[50px] border rounded-full indent-3 '
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </article>

          <div className='flex justify-end items-center gap-4'>
            <button type='button' onClick={handleListViewClick}>
              {' '}
              <FontAwesomeIcon icon={faList} className='text-[25px]' />
            </button>
            <button type='button' onClick={handleGridViewClick}>
              <svg
                id='Capa_1'
                x='0px'
                y='0px'
                viewBox='0 0 512 512'
                width='25'
                height='25'
              >
                <g>
                  <path d='M85.333,0h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,234.667,0,196.462,0,149.333v-64C0,38.205,38.205,0,85.333,0z' />
                  <path d='M362.667,0h64C473.795,0,512,38.205,512,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,38.205,315.538,0,362.667,0z' />
                  <path d='M85.333,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,512,0,473.795,0,426.667v-64C0,315.538,38.205,277.333,85.333,277.333z' />
                  <path d='M362.667,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64C512,473.795,473.795,512,426.667,512h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,315.538,315.538,277.333,362.667,277.333z' />
                </g>
              </svg>
            </button>
          </div>

          {viewMode === 'list' && activeTab === 'All Listings' ? (
            <article
              className='bg-white shadow-2xl rounded-2xl flex w-full lg:flex-col lg:gap-5 lg:h-full lg:px-5 md:flex-col md:justify-center md:items-center 
              md:gap-8 md:p-5 sm:flex-col sm:gap-7 sm:px-5 '
            >
              {listings
                .filter((homes) =>
                  homes.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((homes) => {
                  const formattedPrice = homes.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'NGN',
                  })

                  return (
                    <Link
                      key={homes.id}
                      href={`/dashboard/${homes.id}`}
                      className='flex bg-white shadow-2xl rounded-xl lg:w-full md:flex-row md:justify-start md:items-center md:gap-5 md:p-5 sm:p-5 sm:flex-col 
                      sm:gap-3'
                    >
                      <Image
                        src={homes?.images?.[0]}
                        alt='homes'
                        width={500}
                        height={500}
                        className='rounded-lg object-cover md:h-[150px] md:w-[200px] sm:w-[100%] sm:h-[180px]  '
                      />
                      <div className='flex flex-col gap-5 w-full 2xl:gap-2 xl:gap-4 lg:gap-4 lg:justify-between sm:gap-3 '>
                        <div className='flex md:justify-between md:items-start sm:justify-between sm:items-start'>
                          <h1 className='lg:text-2xl md:text-3xl md:w-[70%] sm:w-[80%] font-extrabold '>
                            {homes.title}
                          </h1>
                          <button className='likebtn'>
                            <FontAwesomeIcon
                              icon={faHeart}
                              className='md:text-[25px] '
                            />
                          </button>
                        </div>

                        <div className='flex items-center gap-2 text-[#ef476f] sm:text-sm '>
                          Apartment
                          <p className=''>
                            {homes.user || 'by Code With Mercy'}
                          </p>
                        </div>

                        <div className='flex lg:justify-between lg:items-center md:flex-row md:justify-between sm:flex-col sm:gap-4'>
                          <div className='flex justify-between items-center gap-5'>
                            <span className='flex items-center gap-1 font-medium'>
                              <FontAwesomeIcon icon={faBuilding} color='grey' />
                              {homes.isNewProperty === true
                                ? 'Newly Built'
                                : 'Used Property'}
                            </span>
                            <p className='font-medium flex items-center gap-2'>
                              <FontAwesomeIcon icon={faBed} color='grey' />
                              {homes.bedrooms}
                            </p>
                            <p className='font-medium flex items-center gap-2'>
                              <FontAwesomeIcon
                                icon={faVectorSquare}
                                color='grey'
                              />
                              {homes.areaSpace}
                            </p>
                          </div>
                          <h1 className='lg:text-2xl md:text-xl sm:text-lg sm:ml-auto font-bold text-[#ef476f] '>
                            {formattedPrice}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </article>
          ) : (
            <main className=''>Grid view</main>
          )}

          {activeTab === 'Recently Added' && (
            <article className='bg-white shadow-2xl rounded-xl w-full p-10 h-full'>
              <h1>Recently added</h1>
            </article>
          )}

          {activeTab === 'Featured' && (
            <article className='bg-white shadow-2xl rounded-xl w-full p-10 h-full'>
              <h1>Featured post </h1>
            </article>
          )}
        </section>

        <section className='flex bg-white shadow-2xl rounded-xl lg:w-[30%] lg:flex-col lg:justify-start lg:items-start lg:gap-4'>
          <span className=''></span>
          <span className=''></span>
          <span className=''></span>
          <span className=''></span>
        </section>
      </main>
    </>
  )
}
