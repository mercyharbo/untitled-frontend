import Image from 'next/image'
import { useEffect, useState } from 'react'

import SignupStep1 from '@/components/signupStep1'
import SignupStep2 from '@/components/signupStep2'
import Head from 'next/head'
import NavHeader from '@/components/navHeader'

const Signup = () => {
  const [step, setStep] = useState(1)

  const getProtectedRoute = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/protected`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.status === true) {
        router.push('/listings')
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProtectedRoute()
  }, [])

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1)
  }

  return (
    <>
      <Head>
        <title>
          {' '}
          Unlock Your Dream Home: Exclusive Realtor Signup | Untitled Realty
        </title>
        <meta
          name='description'
          content='Access the exclusive realtor login at Untitled Realty and unlock your dream home. Discover personalized listings, powerful tools, and expert guidance to make your real estate journey a success. Join our network of top realtors and gain an edge in the competitive housing market.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <NavHeader />
        <main className='grid place-items-center xl:grid-cols-2 lg:grid-cols-2 lg:gap-5 md:grid-cols-1 md:gap-5 sm:grid-cols-1 sm:gap-3'>
          <Image
            src='/avyyy.jpg'
            alt='images'
            width={1000}
            height={1000}
            className='h-auto xl:w-full xl:flex md:w-[35rem] md:hidden sm:w-full sm:hidden object-cover'
          />

          <section className='flex flex-col justify-start w-full m-auto py-10'>
            {step === 1 && <SignupStep1 onNext={handleNext} />}
            {step === 2 && (
              <SignupStep2 onPrev={handlePrev} onNext={handleNext} />
            )}
          </section>
        </main>
      </div>
    </>
  )
}

export default Signup
