import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  // Function to send the POST request
  const login = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
      })

      const data = await response.json()

      if (data?.status === false) {
        console.log('Signup failed')
        setIsloading(false)
        setErrorMsg(data.message)
      } else {
        console.log('Login successfully')
        setIsloading(false)
        router.push({
          pathname: '/dashboard',
          query: { username: username },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission behavior
    login() // Call the login function
  }

  return (
    <main className='grid w-full lg:grid-cols-2 lg:gap-8'>
      <section className='relative'>
        <Image
          src={'/img1.jpg'}
          alt='Login aside'
          width={500}
          height={500}
          className='h-screen w-full object-cover'
        />
        <div className='absolute top-0 left-0 h-screen w-full bg-[#00000060] flex flex-col justify-center items-start gap-5 m-auto 2xl:pl-24'>
          <h1 className='capitalize font-bold text-white 2xl:text-7xl 2xl:w-[60%]  '>
            Welcome back!
          </h1>
          <p className='text-white font-medium 2xl:w-[80%] '>
            We understand that buying or selling a home is a big decision, and
            we are here to make the process as smooth and stress-free as
            possible. We will work with you every step of the way to ensure that
            you get the best possible outcome.
          </p>
        </div>
      </section>

      <section className='w-full flex flex-col justify-between items-start gap-5 m-auto 2xl:h-[50%] 2xl:w-[80%] lg:px-10'>
        <header className='flex flex-col gap-4'>
          <h1 className='2xl:text-4xl lg:text-2xl md:text-xl sm:text-lg font-bold'>
            Login
          </h1>
          <p className='text-base'>
            Welcome back! Please kindly login to your account.
          </p>
        </header>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
          <div className='flex flex-col justify-start items-start gap-2'>
            <label htmlFor='username' className='font-medium'>
              Username
            </label>
            <input
              type='username'
              name='username'
              id='username'
              placeholder='Enter your username'
              onChange={(e) => setUsername(e.target.value)}
              className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
            />
          </div>
          <div className='flex flex-col justify-start items-start gap-2'>
            <label htmlFor='password' className='font-medium'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              autoComplete='false'
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
            />
          </div>
          <div className='flex lg:flex-row lg:justify-between lg:items-center '>
            <div className=''>
              <input type='checkbox' name='rememberMe' id='rememberMe' />{' '}
              Remember me
            </div>
            <button className='border-0 font-medium text-red-600'>
              Forget your password
            </button>
          </div>
          <button
            type='submit'
            className='h-[40px] w-full rounded-lg bg-blue-500 text-white font-medium '
          >
            Login
          </button>

          {errorMsg && <li className='font-medium text-red-500'>{errorMsg}</li>}

          <div className='flex justify-center items-center gap-3 '>
            <span className='font-medium'>New user?</span>
            <Link href={'/signup'} className='text-red-500 font-medium'>
              Signup
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login
