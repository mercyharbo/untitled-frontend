import Link from 'next/link'
import { useState } from 'react'

const SignupStep1 = ({ onNext }) => {
  const [email, setEmail] = useState('')

  const handleNext = () => {
    const data = { email }
    localStorage.setItem('signupData', JSON.stringify(data))
    onNext()
  }

  return (
    <main className='flex flex-col justify-between items-start gap-5 m-auto 2xl:h-[40%] 2xl:w-[80%] xl:px-10 xl:w-full xl:h-[40%] lg:w-full '>
      <header className='flex flex-col gap-4'>
        <h1 className='2xl:text-4xl lg:text-2xl md:text-xl sm:text-lg font-bold'>
          Create an account
        </h1>
        <p className='text-base '>
          Lets get you started with setting up an account with us, so you can
          start buying, selling, and leasing your homes.
        </p>
      </header>

      <form className='flex flex-col gap-5 w-full'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <label htmlFor='email' className='font-medium'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
          />
        </div>

        <button
          onClick={handleNext}
          className='h-[45px] w-full rounded-lg bg-red-500 text-white font-medium hover:bg-black hover:text-white '
        >
          Continue
          {/* {isLoading ? 'Continue' : 'Loading...'} */}
        </button>

        {/* {errorMsg && <li className='font-medium text-red-500'>{errorMsg}</li>} */}
        <p className='text-sm'>
          By submitting, I accept Untitled {''}
          <Link
            href={'terms&condition'}
            className='text-red-500 underline font-medium'
          >
            terms of use
          </Link>
          .
        </p>

        <div className='flex justify-center items-center gap-2 '>
          <span className='font-medium'>Already have an account?</span>
          <Link href={'/login'} className='text-red-500 font-medium underline'>
            Login
          </Link>
        </div>
      </form>
    </main>
  )
}

export default SignupStep1
