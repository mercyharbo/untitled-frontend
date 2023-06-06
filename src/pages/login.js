import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Yup from 'yup'

const Login = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Username or email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: values.email,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (data?.status === true) {
        setIsloading(false)

        // Store the token in localStorage
        localStorage.setItem('token', data.token)

        router.push('/dashboard')
      } else {
        setIsloading(false)
        setErrorMsg(data.error)
      }
    } catch (error) {
      console.error(error)
      setIsloading(false)
      setErrorMsg('An error occurred. Please try again.')
    }
  }

  return (
    <main className='grid xl:grid-cols-2 lg:grid-cols-2 lg:gap-8 md:grid-cols-1 md:gap-5 sm:grid-cols-1 sm:gap-3'>
      <section className='relative '>
        <Image
          src={'/home.jpg'}
          alt='Login aside'
          width={1000}
          height={1000}
          className='lg:h-screen w-full object-cover'
        />
        <div className='absolute top-0 left-0 xl:h-screen w-full bg-[#00000060] flex flex-col justify-center items-start gap-5 m-auto 2xl:pl-24 xl:px-10 md:px-10 md:h-full sm:px-5 sm:h-full'>
          <h1 className='capitalize font-bold text-white 2xl:text-7xl 2xl:w-[60%] xl:text-5xl lg:text-5xl md:text-5xl sm:text-4xl  '>
            Welcome back!
          </h1>
          <p className='text-white font-medium 2xl:w-[80%] xl:w-full md:w-[70%] md:text-lg sm:text-base sm:w-full '>
            We understand that buying or selling a home is a big decision, and
            we are here to make the process as smooth and stress-free as
            possible. We will work with you every step of the way to ensure that
            you get the best possible outcome.
          </p>
        </div>
      </section>

      <section className='flex flex-col justify-between items-start gap-5 2xl:mt-[5rem] 2xl:h-[50%] 2xl:w-[80%] xl:w-[90%] xl:h-[60%] xl:mt-[4rem] md:px-10 md:py-14 sm:px-5 sm:py-10 '>
        <header className='flex flex-col gap-4'>
          <h1 className='2xl:text-5xl lg:text-4xl md:text-4xl sm:text-2xl font-bold'>
            Login
          </h1>
          <p className='text-base'>
            Welcome back! Please kindly login to your account.
          </p>
        </header>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className='w-full flex flex-col gap-5'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <label htmlFor='email' className='font-medium'>
                Email{' '}
              </label>
              <Field
                type='text'
                id='email'
                name='email'
                autoComplete='off'
                placeholder='Enter your username or email'
                className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
              />
              <ErrorMessage
                name='email'
                component={'span'}
                className='text-red-500'
              />{' '}
            </div>

            <div className='flex flex-col justify-start items-start gap-2'>
              <label htmlFor='password' className='font-medium'>
                Password
              </label>
              <div className='relative w-full'>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  autoComplete='off'
                  placeholder='Enter your password'
                  className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 xl:top-[11px] md:top-[14px] sm:top-3 '
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              <ErrorMessage
                name='password'
                component={'span'}
                className='text-red-500'
              />{' '}
            </div>

            {errorMsg && (
              <li className='text-red-500 font-medium'>{errorMsg}</li>
            )}

            <div className='flex flex-row justify-between items-center  '>
              <div className=''>
                <Field type='checkbox' name='rememberMe' id='rememberMe' />{' '}
                Remember me
              </div>
              <Link href={'/forgetpassword'} className='border-0 font-medium '>
                Forget your password
              </Link>
            </div>

            <button
              type='submit'
              className='h-[45px] w-full rounded-lg bg-[#ffb703] font-semibold hover:bg-black hover:text-white'
            >
              Login
            </button>
          </Form>
        </Formik>

        <div className='flex justify-center items-center gap-1 '>
          <span className='font-medium'>Don&#39;t have an account?</span>
          <Link
            href={'/signup'}
            className='text-[#023047] font-medium underline'
          >
            Register
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Login
