import Image from 'next/image'
import { useState } from 'react'

import SignupStep1 from '@/components/signupStep1'
import SignupStep2 from '@/components/signupStep2'

const Signup = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1)
  }

  return (
    <main className='flex gap-5'>
      <section className='relative lg:w-[50%] lg:h-screen '>
        <Image
          src={'/home.jpg'}
          alt='Login aside'
          width={500}
          height={500}
          className='h-full w-full object-cover'
        />
        <div
          className='absolute top-0 left-0  w-full bg-[#00000060] gap-5 m-auto flex flex-col xl:justify-center xl:items-start lg:h-screen  2xl:pl-24 lg:pl-20 
        md:items-center md:justify-center md:h-full sm:h-full sm:justify-center sm:items-center'
        >
          <h1 className='capitalize font-bold text-white 2xl:text-7xl 2xl:w-[60%] lg:text-5xl lg:w-[60%] md:text-4xl sm:text-3xl  '>
            Welcome to Untitled
          </h1>
          <p
            className='text-white font-medium 2xl:w-[80%] lg:w-[80%] lg:text-xl lg:text-left md:w-[80%] md:text-center md:text-xl sm:w-[90%] sm:text-center 
          sm:text-base '
          >
            We understand that buying or selling a home is a big decision, and
            we are here to make the process as smooth and stress-free as
            possible. We will work with you every step of the way to ensure that
            you get the best possible outcome.
          </p>
        </div>
      </section>

      <section className='flex flex-col justify-start lg:w-[50%]'>
        {step === 1 && <SignupStep1 onNext={handleNext} />}
        {step === 2 && <SignupStep2 onPrev={handlePrev} onNext={handleNext} />}
      </section>
    </main>
  )
}

export default Signup
