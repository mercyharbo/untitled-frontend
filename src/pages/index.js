import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBed,
  faShield,
  faSink,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import Carousel from '@/components/Carousel'
import { setListings, setLoading, setTotal } from '@/slice/listingSlice'
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/fontawesome-free-brands'

const TestimonialJSON = [
  {
    title: 'A dream come true',
    comment:
      "I had been looking for a house in the countryside for a long time, but I couldn't find anything that matched my budget and preferences. Then I came across this website and I was amazed by the variety and quality of the properties they offered. They helped me find the perfect home for me and my family, with a spacious garden, a cozy fireplace and a stunning view. They were professional, friendly and attentive throughout the whole process. I couldn't be happier with my purchase and I highly recommend this website to anyone looking for their dream home.",
  },
  {
    title: 'The best service ever',
    comment:
      'I was skeptical about buying a house online, but this website changed my mind. They made everything so easy and convenient for me. They showed me a lot of options that suited my needs and preferences, and they guided me through every step of the transaction. They were always available to answer my questions and concerns, and they gave me honest and helpful advice. They also arranged everything for the inspection, appraisal and closing. I got a great deal on a beautiful house that I love. This website is the best service ever for anyone who wants to buy a house.',
  },
  {
    title: 'A hassle-free experience',
    comment:
      "I had a tight deadline to sell my old house and buy a new one, and I was stressed out by the whole process. But this website made it a hassle-free experience for me. They helped me list my old house and find a buyer quickly, and they also helped me find a new house that met all my expectations. They handled all the paperwork and negotiations for me, and they made sure everything went smoothly and on time. They were very responsive, reliable and courteous throughout the whole process. I'm very satisfied with their service and I would definitely use them again.",
  },
  {
    title: 'A hassle-free experience',
    comment:
      "I had a tight deadline to sell my old house and buy a new one, and I was stressed out by the whole process. But this website made it a hassle-free experience for me. They helped me list my old house and find a buyer quickly, and they also helped me find a new house that met all my expectations. They handled all the paperwork and negotiations for me, and they made sure everything went smoothly and on time. They were very responsive, reliable and courteous throughout the whole process. I'm very satisfied with their service and I would definitely use them again.",
  },
]

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
    <main className='overflow-hidden'>
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

      <section
        className='bg-[#090030] w-full py-5 text-white flex 2xl:mb-[15rem] xl:mb-[12rem] xl:flex-row xl:h-[500px] xl:justify-center xl:items-center
      md:flex-col md:py-8 md:gap-8 sm:flex-col sm:gap-8 sm:py-10'
      >
        <article className='2xl:pl-[10rem] xl:w-[50%] xl:pl-10 md:px-10 sm:px-5 flex flex-col gap-5'>
          <h1 className='2xl:w-[80%] xl:text-6xl xl:w-[70%] xl:leading-[70px] md:text-5xl md:w-[70%] md:leading-[70px] sm:text-4xl sm:leading-[50px] '>
            Some of our happy Client&quot;s
          </h1>
          <p className='text-lg 2xl:w-[70%] xl:w-[85%] md:w-[85%] sm:w-full'>
            In promotion and advertising, a testimonial or show consist&quot;s
            of a person&quot;s written or spoken statement extolling the
            virtue&quot;s of a product.
          </p>
        </article>

        <div className='xl:w-[50%] xl:mt-[20rem] 2xl: xl:pl-10  '>
          <Carousel autoplay={true} autoplayInterval={5000}>
            {TestimonialJSON.map((testy, index) => (
              <div
                key={index}
                className='flex flex-col flex-grow gap-5 bg-white text-black shadow-2xl rounded-lg p-5 xl:h-[430px] md:h-[500px] sm:h-[480px] '
                // style={{ width: '750px' }}
              >
                <h3 className='xl:text-2xl md:text-2xl sm:text-xl '>
                  {testy.title}
                </h3>
                <p className='xl:text-base md:text-lg'>{testy.comment}</p>

                <div className='flex flex-col gap-2'>
                  <h3 className='xl:text-xl md:text-xl sm:text-lg '>
                    Benjamin Appling
                  </h3>
                  <span className='text-sm text-gray-500'>Happy Client</span>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center gap-10 mx-auto xl:w-[60%] md:py-16 sm:py-10   '>
        <h1 className='xl:text-5xl xl:w-[40%] md:text-5xl md:w-[50%] sm:w-[80%] sm:text-3xl text-center '>
          Subscribe to our newsletter
        </h1>
        <div className='relative'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            className='border bg-white rounded-md indent-3 outline-none xl:w-[45rem] xl:h-[60px] md:w-[40rem] md:h-[60px] sm:w-[25rem] sm:h-[50px] '
          />
          <button
            type='button'
            className='bg-[#090030] rounded-md text-white absolute right-0 xl:h-[60px] xl:w-[140px] md:w-[100px] md:h-[60px] sm:h-[50px] sm:w-[100px] '
          >
            Subscribe
          </button>
        </div>
      </section>
      <footer className='xl:h-[500px] xl:mt-0 xl:flex-row xl:justify-between xl:items-start xl:gap-8 xl:p-10 md:flex-col md:justify-center md:items-center 
      md:gap-10 md:p-10 md:mt-0 sm:mt-0 sm:flex-col sm:justify-center sm:items-center sm:gap-5 sm:p-5 text-white bg-[#090030] flex   '>
        <article className='xl:w-[30%] md:w-full sm:w-full flex flex-col gap-8 '>
          <h1 className='xl:text-5xl md:text-4xl sm:text-4xl'>Untitled</h1>
          <p className='text-lg md:text-xl sm:text-xl'>
            No matter how quickly you need to make an offer, our data and
            experts are always available. Let"s start here
          </p>
          <div className='flex items-center gap-5'>
            <Link href={'/'}>
              <FontAwesomeIcon icon={faLinkedin} className='text-[30px]' />
            </Link>
            <Link href={'/'}>
              <FontAwesomeIcon icon={faInstagram} className='text-[30px]' />
            </Link>
            <Link href={'/'}>
              <FontAwesomeIcon icon={faTwitter} className='text-[30px]' />
            </Link>
            <Link href={'/'}>
              <FontAwesomeIcon icon={faFacebook} className='text-[30px]' />
            </Link>
          </div>
        </article>
        <article className='xl:w-[20%] md:w-full sm:w-full flex flex-col gap-5 '>
          <h3 className='md:text-2xl sm:text-2xl'>Company</h3>
          <nav className='flex flex-col gap-5 text-lg'>
            <Link href='/about'>About us</Link>
            <Link href='/pricing'>Pricing</Link>
            <Link href='/contact'>Contact us</Link>
            <Link href='/blog'>Blog</Link>
          </nav>
        </article>
        <article className='xl:w-[25%] md:w-full sm:w-full flex flex-col gap-5 '>
          <h3 className='md:text-2xl sm:text-2xl'>Support</h3>
          <nav className='flex flex-col gap-5 text-lg'>
            <Link href='/helpcenter'>Help center</Link>
            <Link href='/termsofservice'>Terms of services</Link>
            <Link href='/legal'>Legal</Link>
            <Link href='/privacypolicy'>Privacy policy</Link>
          </nav>
        </article>
        <article className='xl:w-[25%] md:w-full sm:w-full flex flex-col gap-5 '>
          <h3 className='text-xl uppercase'>Our app is coming soon</h3>
        </article>
      </footer>
    </main>
  )
}
