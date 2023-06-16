import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBed,
  faShield,
  faShieldAlt,
  faSink,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import Carousel from '@/components/Carousel'
import { setListings, setLoading, setTotal } from '@/slice/listingSlice'

export default function Home() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.listings.loading)
  const listings = useSelector((state) => state.listings.listings)

  useEffect(() => {
    const getListings = async () => {
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT}/api/listings`,
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
          dispatch(setLoading(false))
        } else {
          console.log('there is an error')
        }
      } catch (error) {}
    }

    getListings()
  }, [dispatch])

  return (
    <main className='2xl:pb-14 overflow-hidden'>
      <section
        className='relative flex bg-[#090030] text-white shadow-2xl 2xl:grid-cols-2 xl:place-items-center xl:grid-cols-2 
       xl:p-0 lg:grid-cols-2 md:flex-row sm:flex-col-reverse'
      >
        <section className='flex flex-col justify-start items-start gap-5 2xl:px-16 xl:px-14 xl:pt-20 md:pt-5 sm:p-5'>
          <h1
            className='2xl:text-6xl 2xl:leading-[70px] xl:w-full xl:leading-[60px] xl:text-5xl lg:text-5xl md:text-4xl 
          md:w-full md:leading-[50px] sm:text-4xl sm:w-full '
          >
            The ease of buying and renting a dream house & apartment
          </h1>
          <p className='2xl:w-[80%] xl:text-xl md:w-full md:text-lg sm:text-lg sm:w-full '>
            No matter how quickly you need to make an offer, our data and
            experts are always available. Let&quot;s start here
          </p>
        </section>
        <Image
          src={'/yellowChair.avif'}
          alt='home'
          width={1000}
          height={1000}
          className='xl:flex lg:flex md:flex md:w-[50%] sm:flex sm:w-full object-cover'
        />
      </section>

      <div className='flex flex-col justify-center items-center gap-5 py-14 md:mx-10 sm:mx-5'>
        <h1 className='xl:text-5xl md:text-4xl sm:text-4xl '>Our Services</h1>
        <section
          className='grid mx-auto 2xl:w-[80%] xl:grid-cols-3 xl:gap-5 xl:py-8 xl:w-[90%] md:grid-cols-1 md:gap-5 md:w-full
           sm:gap-5 '
        >
          <article className='grid grid-cols-1 place-items-start gap-4 bg-[#090030] text-white p-5 rounded-md shadow-2xl '>
            <Image
              src='/house.png'
              alt='Home icon'
              width={500}
              height={500}
              className='bg-[#4d27f79c] p-5 rounded-md flex justify-center items-center w-[100px] h-[100px] object-cover '
            />
            <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl '>
              Buy a home
            </h1>
            <p className=' xl:w-full md:w-[70%] '>
              Find your place with an immersive photo experience and the most
              listings, including the things you won&apos;t find anywhere else.
            </p>
            <Link
              href='/learnmore'
              className='text-[#F30A49] font-medium underline flex justify-start items-center gap-2 '
            >
              Learn More <FontAwesomeIcon icon={faArrowRight} />{' '}
            </Link>
          </article>
          <article className='grid grid-cols-1 place-items-start gap-4 bg-[#090030] text-white p-5 rounded-md shadow-2xl '>
            <Image
              src='/rent.png'
              alt='Home icon'
              width={500}
              height={500}
              className='bg-[#4d27f79c] p-5 rounded-md flex justify-center items-center w-[100px] h-[100px] object-cover '
            />
            <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl '>
              Rent a home
            </h1>
            <p className=' xl:w-full md:w-[70%] '>
              We&apos;re creating a seamless online experience - from shopping
              on the largest rental network, to applying to paying rents.
            </p>
            <Link
              href='/learnmore'
              className='text-[#F30A49] font-medium underline flex justify-start items-center gap-2 '
            >
              Learn More <FontAwesomeIcon icon={faArrowRight} />{' '}
            </Link>
          </article>
          <article className='grid grid-cols-1 place-items-start gap-4 bg-[#090030] text-white p-5 rounded-md shadow-2xl '>
            <Image
              src='/sale.png'
              alt='Home icon'
              width={500}
              height={500}
              className='bg-[#4d27f79c] p-5 rounded-md flex justify-center items-center w-[100px] h-[100px] object-cover '
            />
            <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl '>
              Sell a home
            </h1>
            <p className=' xl:w-full md:w-[70%] '>
              Whether you get a cash offer through offers or choose to sell
              traditionally, we can help you navigate a successful sale.{' '}
            </p>
            <Link
              href='/learnmore'
              className='text-[#F30A49] font-medium underline flex justify-start items-center gap-2 '
            >
              Learn More <FontAwesomeIcon icon={faArrowRight} />{' '}
            </Link>
          </article>
        </section>
      </div>

      <section
        className='bg-[#090030] text-white flex xl:flex-row xl:justify-between xl:items-center xl:py-5 md:flex-col md:justify-center md:items-center md:py-16
      sm:justify-center sm:items-center sm:flex-col sm:py-16  '
      >
        <div className='flex flex-col gap-10 2xl:w-[50%] xl:pl-10 xl:w-[50%] lg:w-[50%] md:w-full md:px-10 sm:px-5 sm:w-full '>
          <h1 className='2xl:text-5xl 2xl:leading-[60px] xl:text-5xl xl:w-[70%] xl:leading-[60px] lg:text-4xl md:text-6xl md:leading-[70px] md:w-[70%] sm:text-5xl sm:w-full '>
            Our featured properties
          </h1>
          <p className='2xl:w-[80%] xl:w-full md:w-[80%] text-lg '>
            Looking for the perfect home? Look no further than our featured
            properties! These homes have been hand-picked by our team of
            experienced realtors and offer the best of everything. Whether
            you&apos;re looking for a spacious family home, a cozy starter home,
            or a luxurious condo, we have the perfect property for you.
          </p>
        </div>

        <div className='flex overflow-x-auto overflow-y-hidden flex-nowrap gap-7 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[90%] sm:w-[95%] sm:py-10 '>
          <style>
            {`
              .flex::-webkit-scrollbar {
                display: none; /* Hide the scrollbar */
              }
            `}
          </style>
          {listings.map((home) => {
            return (
              <Link
                href={`/listings/${home.id}`}
                key={home.id}
                className='flex-shrink-0 2xl:w-[380px] xl:w-[400px] md:w-[380px] sm:w-[350px] bg-white text-black shadow-2xl rounded-lg p-3 flex flex-col gap-4'
              >
                <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-xl'>
                  {home.title}
                </h1>
                <div className='flex justify-between items-center text-gray-500'>
                  <span className='flex flex-col justify-start items-start gap-2 font-semibold'>
                    Bathroom
                    <span className='flex items-center gap-2 font-normal'>
                      <FontAwesomeIcon icon={faSink} />
                      {home.bathroom}
                    </span>
                  </span>
                  <span className='flex flex-col justify-start items-start gap-2 font-semibold'>
                    Bedrooms
                    <span className='flex items-center gap-2 font-normal'>
                      <FontAwesomeIcon icon={faBed} />
                      {home.bedrooms}
                    </span>
                  </span>
                  <span className='flex flex-col justify-start items-start gap-2 font-semibold'>
                    Area Space
                    <div className='span flex items-center gap-2 font-normal'>
                      <FontAwesomeIcon icon={faVectorSquare} />
                      {home.areaSpace}
                    </div>
                  </span>
                </div>
                <Image
                  src={home?.images?.[0]}
                  alt='homes'
                  width={500}
                  height={500}
                  className='rounded-lg object-cover w-full 2xl:h-[250px] lg:h-[250px]'
                />
                <div className='flex justify-between items-center flex-wrap'>
                  <h1 className='lg:text-xl md:text-lg sm:text-base'>
                    {home.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </h1>
                  <button type='button' className='border p-2 px-4 rounded-lg'>
                    View Details
                  </button>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section
        className='flex flex-col gap-10 justify-start items-start mx-auto 2xl:p-14 2xl:w-[80%] xl:w-[80%] xl:p-10 lg:p-10 lg:w-[80%] md:w-full md:p-10 sm:w-full
      sm:p-5 '
      >
        <div className='flex flex-col justify-start items-start gap-5 '>
          <h1 className='2xl:text-6xl 2xl:w-[70%] 2xl:leading-[80px] xl:w-[80%] xl:text-4xl md:text-4xl md:w-[70%] sm:text-4xl w-full '>
            Reach quality renters and fill vacancies faster.
          </h1>
          <p className='text-lg xl:w-[70%] md:w-[70%] '>
            We have marketing solutions for landlords, agents, and multifamily
            professionals.
          </p>
        </div>

        <div className='flex flex-col rounded-lg shadow-2xl w-full 2xl:pb-0 xl:pb-0 lg:pb-0 md:pb-0 sm:pb-20  '>
          <span className='flex justify-between items-center flex-wrap bg-white border-b-2 2xl:h-[150px] xl:h-[150px] lg:h-[140px] md:h-[100px] sm:h-[150px] '>
            <div className='flex items-center gap-5 text-lg font-semibold px-5 2xl:w-[80%] xl:w-[80%] md:w-[80%] sm:w-full sm:text-base  '>
              <span
                className='bg-[#090030] text-white flex justify-center items-center w-[60px] h-[60px] rounded-full 2xl:w-[60px] 2xl:h-[60px] 
                2xl:text-2xl xl:w-[60px] xl:h-[60px] lg:text-2xl md:text-xl md:w-[70px] md:h-[60px] sm:text-xl sm:w-[80px] sm:h-[40px] '
              >
                1{' '}
              </span>
              Reach over 3 million high-quality renters actively searching on
              our network.
            </div>
            <div className='2xl:w-[20%] xl:flex md:flex md:w-[20%] sm:hidden h-full bg-green-200 flex justify-center items-center '>
              <FontAwesomeIcon
                icon={faShield}
                className='2xl:text-5xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl fill-transparent stroke-none bg-transparent '
              />
            </div>
          </span>

          <span className='flex justify-between items-center flex-wrap bg-white border-b-2 2xl:h-[150px] xl:h-[150px] lg:h-[140px] md:h-[100px] sm:h-[150px] '>
            <div className='flex items-center gap-5 text-lg font-semibold px-5 2xl:w-[80%] xl:w-[80%] md:w-[80%] sm:w-full sm:text-base  '>
              <span
                className='bg-[#090030] text-white flex justify-center items-center w-[60px] h-[60px] rounded-full 2xl:w-[60px] 2xl:h-[60px] 
                2xl:text-2xl xl:w-[60px] xl:h-[60px] lg:text-2xl md:text-xl md:w-[70px] md:h-[60px] sm:text-xl sm:w-[80px] sm:h-[40px] '
              >
                2{' '}
              </span>
              Get exposure across our broad network of leading apartment search
              sites.
            </div>
            <div className='2xl:w-[20%] xl:flex md:flex md:w-[20%] sm:hidden h-full bg-green-200 flex justify-center items-center '>
              {' '}
              <FontAwesomeIcon
                icon={faShield}
                className='2xl:text-5xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl '
              />
            </div>
          </span>

          <span className='flex justify-between items-center flex-wrap bg-white border-b-2 2xl:h-[150px] xl:h-[150px] lg:h-[140px] md:h-[100px] sm:h-[150px] '>
            <div className='flex items-center gap-5 text-lg font-semibold px-5 2xl:w-[80%] xl:w-[80%] md:w-[80%] sm:w-full sm:text-base  '>
              <span
                className='bg-[#090030] text-white flex justify-center items-center w-[60px] h-[60px] rounded-full 2xl:w-[60px] 2xl:h-[60px] 
                2xl:text-2xl xl:w-[60px] xl:h-[60px] lg:text-2xl md:text-xl md:w-[60px] md:h-[60px] sm:text-xl sm:w-[70px] sm:h-[40px] '
              >
                3{' '}
              </span>{' '}
              Receive ongoing support from a dedicated Account Manager.
            </div>
            <div className='2xl:w-[20%] xl:flex md:flex md:w-[20%] sm:hidden h-full bg-green-200 flex justify-center items-center '>
              <FontAwesomeIcon
                icon={faShield}
                className='2xl:text-5xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl '
              />
            </div>
          </span>

          <span
            className='flex justify-between items-center  bg-white border-b-2 2xl:flex-row 2xl:h-[150px] xl:h-[150px] xl:flex-row lg:flex-row 
          lg:h-[140px] md:h-[100px] md:flex-row sm:flex-col sm:h-[150px] sm:gap-5 '
          >
            <div className='flex flex-col gap-2 flex-wrap px-5 2xl:w-[80%] xl:w-[80%] md:w-[80%] sm:w-full sm:text-base '>
              <h1 className='capitalize  2xl:text-5xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl '>
                Unlock our premium features
              </h1>
              <p className=''>
                Advertise with us to optimise your leasing success.
              </p>
            </div>
            <div className='2xl:w-[20%] xl:flex xl:w-[20%] md:flex md:w-[20%] sm:flex sm:w-full h-full  bg-green-200 flex justify-center items-center  '>
              <button
                type='button'
                className='2xl:py-3 2xl:px-6 xl:py-3 xl:px-4 xl:my-0 md:px-2 md:py-2 md:my-0 sm:py-3 sm:px-5 sm:my-4 rounded-lg bg-[#090030] text-white capitalize font-semibold '
              >
                Check our pricing
              </button>
            </div>
          </span>
        </div>
      </section>
    </main>
  )
}
