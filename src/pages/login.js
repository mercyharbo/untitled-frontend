import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Field, Form, Formik } from 'formik'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Yup from 'yup'

import InputField from '@/hooks/InputField'
import Button from '@/hooks/button'
import NavHeader from '@/components/navHeader'

const Login = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().required('Username or email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = async (values) => {
    setIsloading(true)
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: values.email,
            password: values.password,
          }),
        }
      )

      const data = await response.json()

      if (data?.status === true) {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('token', data.token)
        setIsloading(false)
        router.push('/listings')
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
    <>
      <Head>
        <title>
          Unlock Your Dream Home: Exclusive Realtor Login | Untitled Realty
        </title>
        <meta
          name='description'
          content='Access the exclusive realtor login at Untitled Realty and unlock your dream home. Discover personalized listings, powerful tools, and expert guidance to make your real estate journey a success. Join our network of top realtors and gain an edge in the competitive housing market.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavHeader />
      <main className='grid place-items-center xl:grid-cols-2 lg:grid-cols-2 lg:gap-5 md:grid-cols-1 md:gap-5 sm:grid-cols-1 sm:gap-3'>
        <Image
          src='/avyyy.jpg'
          alt='images'
          width={1000}
          height={1000}
          className='h-auto xl:w-full md:w-[35rem] sm:w-full object-cover'
        />

        <section className='flex flex-col gap-5 2xl:p-10 2xl:w-[90%] md:w-full sm:p-5 '>
          <header className='flex flex-col gap-4'>
            <h1 className='2xl:text-5xl lg:text-4xl md:text-4xl sm:text-2xl font-bold'>
              Login
            </h1>
            <p className='text-base'>
              Welcome back! Please kindly login to your account.
            </p>
          </header>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form className='flex flex-col gap-5 w-full py-5'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='email' className='font-medium'>
                  Email/Username
                </label>
                <div className='w-full'>
                  <InputField
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Enter your username or email'
                    className='h-[50px] w-full '
                    style={{
                      width: '100%',
                    }}
                  />
                </div>
              </div>

              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='password' className='font-medium'>
                  Password
                </label>
                <div className='relative w-full'>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    placeholder='Enter your password'
                    className='h-[50px] w-full '
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 xl:top-[11px] md:top-[14px] sm:top-3 '
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </div>

              {errorMsg && (
                <li className='text-red-500 font-medium'>{errorMsg}</li>
              )}

              <div className='flex flex-row justify-between items-center  '>
                <div className=''>
                  <Field type='checkbox' name='rememberMe' id='rememberMe' />{' '}
                  Remember me
                </div>
                <Link
                  href={'/forgetpassword'}
                  className='border-0 font-medium '
                >
                  Forget your password
                </Link>
              </div>

              <Button
                type='submit'
                label={isLoading ? 'Loggin...' : 'Login'}
                name='login'
                className='h-[50px] rounded-md '
              />
            </Form>
          </Formik>

          <div className='flex justify-center items-center gap-1 '>
            <span className='font-medium'>Don&#39;t have an account?</span>
            <Link href={'/signup'} className='text-hover font-medium underline'>
              Register
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login
