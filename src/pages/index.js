import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { Form, Formik } from 'formik'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/fontawesome-free-brands'
import { motion } from 'framer-motion'

import Carousel from '@/components/Carousel'
import { setListings, setLoading } from '@/slice/listingSlice'
import NavHeader from '@/components/navHeader'
import SelectField from '@/hooks/SelectField'

import InputField from '@/hooks/InputField'
import Button from '@/hooks/button'

const options = [
  { value: 'Property Type', label: 'Property Type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'commercial-property', label: 'Commercial Property' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condo' },
  { value: 'holiday-cottage', label: 'Holiday Cottage' },
  { value: 'single-family-home', label: 'Single Family Home' },
  { value: 'hostel', label: 'Hostel' },
]

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
          `${process.env.API_ENDPOINT_RENDER}/api/listings`,
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
  }, [])

  return (
    <>
      <Head>
        <title>Discover Your Dream Home: Untitlted Realty</title>
        <meta
          name='description'
          content='Embark on a remarkable real estate journey with XYZ Realty. Explore a vast collection of extraordinary properties, from luxurious estates to charming starter homes. Our expert agents are ready to guide you every step of the way. Start your search today and find the perfect place to call home.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='overflow-hidden'>
        <NavHeader />
        <section className='relative flex 2xl:h-[50rem] 2xl:pt-[10rem] xl:h-[45rem] xl:pt-[5rem] md:h-[40rem] md:pt-[4rem] sm:pt-[5rem] sm:h-[40rem] '>
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex flex-col justify-start items-start gap-5 3xl:pl-24 2xl:w-[50%] 2xl:pl-14 xl:pl-[5rem] xl:w-[50%] md:w-[50%] md:pl-5 sm:pl-5 '
          >
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
            <div
              className='bg-[#F3F3FA] p-4 rounded-lg absolute z-10 3xl:left-[6rem] 2xl:w-[60%] 2xl:bottom-[15rem] 2xl:left-[4rem] xl:bottom-[15rem] xl:w-[70%] xl:left-[5rem] 
            md:bottom-[12rem] md:w-[80%] sm:w-[95%] sm:left-3 sm:bottom-[5rem]  '
            >
              <Formik
                initialValues={{ propertyType: '', state: '' }}
                // onSubmit={handleSubmit}
              >
                <Form className='flex gap-2 2xl:flex-row xl:flex-row md:flex-row sm:flex-col '>
                  <SelectField
                    name='propertyType'
                    id='propertyType'
                    options={options}
                    className='3xl:w-[300px] 2xl:w-[200px] md:w-[140px] sm:h-[55px] border-2 border-color2 focus:border-hover'
                  />
                  <InputField
                    type='text'
                    name='state'
                    id='state'
                    placeholder='Enter your prefer destination...'
                    className='3xl:w-[45rem] 2xl:w-[37rem] xl:w-[33rem] md:w-[23rem] sm:w-full  '
                  />
                  <Button
                    type='button'
                    name='button'
                    label='Search'
                    className='bg-color3 rounded-md w-full text-white flex justify-center items-center gap-3 hover:bg-hover xl:h-[55px] sm:h-[50px] '
                    icons={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  />
                </Form>
              </Formik>
            </div>
          </motion.section>

          <Image
            src={'/yellowChair.avif'}
            alt='home'
            width={1000}
            height={1000}
            className='absolute rounded-md 3xl:right-[10rem] 3xl:top-28 3xl:w-[43rem] 3xl:h-[40rem] 2xl:right-[6rem] 2xl:top-14 2xl:w-[40rem] 
            2xl:h-[38rem] 2xl:flex xl:top-5 xl:right-[2rem] xl:w-[35rem] xl:h-[35rem] xl:flex md:w-[20rem] md:h-[30rem] md:right-5 
            md:flex sm:hidden object-cover '
          />
        </section>

        <section className='flex flex-col gap-5 bg-color2 2xl:p-14 xl:p-14 md:p-10 sm:p-5'>
          <div className='flex justify-between xl:items-end xl:flex-row md:flex-row md:items-end sm:items-start sm:gap-5 sm:flex-col '>
            <div className='flex flex-col justify-start items-start gap-4'>
              <h1 className='2xl:text-5xl md:text-2xl sm:text-2xl '>
                Top offers
              </h1>
              <p className='2xl:w-[70%] md:w-[70%] '>
                Fulfill your career dreams, enjoy all the achievements of the
                city center and luxury housing to the fullest.
              </p>
            </div>

            <Link
              href='/listings'
              className='border-2 border-color3 h-[50px] text-color3 flex justify-center items-center w-[170px] font-semibold hover:border-hover '
            >
              Show all offers{' '}
            </Link>
          </div>

          <div className='flex overflow-x-auto overflow-y-hidden flex-nowrap gap-7 w-full sm:py-5 '>
            <style>
              {`
              .flex::-webkit-scrollbar {
                display: none; /* Hide the scrollbar */
              }
            `}
            </style>
            {listings?.slice(0, 6).map((home) => {
              return (
                <Link
                  key={home._id}
                  href={`/listings/${home.id}`}
                  className='flex-shrink-0 2xl:w-[350px] xl:w-[400px] md:w-[350px] sm:w-[350px] bg-white text-black rounded-lg p-3 flex flex-col gap-4'
                >
                  <Image
                    src={home?.images?.[0]}
                    alt='homes'
                    width={500}
                    height={500}
                    className='rounded-lg object-cover w-full 2xl:h-[250px] lg:h-[250px] sm:h-[200px] '
                  />

                  <div className='flex flex-col gap-3'>
                    <h1 className='text-xl'>{home.title}</h1>
                    <h4 className='text-base text-color3'>
                      {home?.price?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'NGN',
                      })}
                    </h4>
                    <span className='text-[gray] text-sm '>{home.address}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className='grid 2xl:grid-cols-2 xl:grid-cols-2 xl:p-14 md:grid-cols-2 md:p-10 '>
          <article className=''>
            <Image
              src={'/yellowChair.avif'}
              alt='home'
              width={1000}
              height={1000}
              className=' rounded-md 2xl:right-[15rem] 2xl:top-10 2xl:w-[40rem] 2xl:h-[35rem] 2xl:flex xl:top-5 xl:right-[2rem] xl:w-[30rem] xl:h-[30rem] xl:flex
          md:w-[20rem] md:h-[25rem] md:right-5 md:flex sm:hidden object-cover '
            />
          </article>

          <article className='flex flex-col justify-start items-start gap-7 p-5'>
            <h1 className='2xl:text-5xl xl:text-4xl md:text-3xl sm:text-2xl'>
              About us
            </h1>
            <p className='2xl:w-[60%] '>
              We are a company that connects the world of real estate and
              finance. We provide a complete service for the sale, purchase or
              rental of real estate. Our advantage is more than 15 years of
              experience and soil in attractive locations in Slovakia with
              branches in Bratislava and Košice. We have a connection to all
              banks on the Slovak market, so we can solve everything under one
              roof. By constantly innovating our business activities, we move
              forward and we are able to offer truly above-standard services
              that set us apart from the competition.
            </p>
          </article>
        </section>

        <section
          className='bg-color2 w-full py-5  flex 2xl:mb-[15rem] xl:mb-[12rem] xl:flex-row xl:h-[500px] xl:justify-center xl:items-center
      md:flex-col md:py-8 md:gap-8 sm:flex-col sm:gap-8 sm:py-10'
        >
          <article className='2xl:pl-[10rem] xl:w-[50%] xl:pl-10 md:px-10 sm:px-5 flex flex-col gap-5'>
            <h1 className='2xl:w-[90%] xl:text-6xl xl:w-[70%] xl:leading-[70px] md:text-5xl md:w-[70%] md:leading-[70px] sm:text-4xl sm:leading-[50px] '>
              Some of our happy Client&quot;s
            </h1>
            <p className='text-lg 2xl:w-[80%] xl:w-[85%] md:w-[85%] sm:w-full'>
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
                  className='flex flex-col flex-grow gap-5 bg-white text-black shadow-md rounded-lg p-5 xl:h-[430px] md:h-[500px] sm:h-[480px] '
                >
                  <h3 className='xl:text-2xl md:text-2xl sm:text-xl '>
                    {testy.title}
                  </h3>
                  <p className='xl:text-base md:text-lg'>{testy.comment}</p>

                  <div className='flex flex-col gap-2'>
                    <h3 className='xl:text-xl md:text-xl sm:text-lg '>
                      Benjamin Appling
                    </h3>
                    <span className='text-sm text-[gray]'>Happy Client</span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        <section className='flex flex-col justify-center items-center gap-10 mx-auto xl:w-[60%] md:py-16 sm:py-10   '>
          <div className='flex flex-col gap-2 justify-center items-center w-full px-5'>
            <h1 className='xl:text-5xl xl:w-[40%] md:w-full md:text-5xl sm:w-[80%] sm:text-3xl text-center '>
              Subscribe to our newsletter
            </h1>
            <p className='text-center'>
              Get the latest news and interesting offers and real estate.
            </p>
          </div>

          <Formik
            initialValues={{ propertyType: '', state: '' }}
            // onSubmit={handleSubmit}
          >
            <Form className='flex justify-center xl:flex-row xl:items-center xl:gap-5 sm:flex-col sm:w-[95%] sm:gap-5 '>
              <InputField
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                className='2xl:w-[40rem] xl:w-[40rem] sm:w-full '
              />

              <Button
                label='Subscribe'
                type='submit'
                className='bg-color3 text-white xl:h-[55px] rounded-md hover:bg-hover '
              />
            </Form>
          </Formik>
        </section>

        <footer
          className='xl:h-[500px] xl:mt-0 xl:flex-row xl:justify-between xl:items-start xl:gap-8 xl:p-10 md:flex-col md:justify-center md:items-center 
      md:gap-10 md:p-10 md:mt-0 sm:mt-0 sm:flex-col sm:justify-center sm:items-center sm:gap-5 sm:p-5 bg-color2 flex   '
        >
          <article className='xl:w-[30%] md:w-full sm:w-full flex flex-col gap-8 '>
            <h1 className='xl:text-5xl md:text-4xl sm:text-4xl'>Untitled</h1>
            <p className='text-base xl:w-[400px] md:text-xl sm:text-xl'>
              No matter how quickly you need to make an offer, our data and
              experts are always available. Let&quot;s start here
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
    </>
  )
}
