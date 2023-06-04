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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // // Function to send the POST request
  // const login = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         identifier: username,
  //         password: password,
  //       }),
  //     })

  //     const data = await response.json()

  //     if (data?.status === false) {
  //       console.log('Signup failed')
  //       setIsloading(false)
  //       setErrorMsg(data.message)
  //     } else {
  //       console.log('Login successfully')
  //       setIsloading(false)
  //       router.push({
  //         pathname: '/dashboard',
  //         query: { username: username },
  //       })
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault() // Prevent default form submission behavior
  //   login() // Call the login function
  // }

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Username or email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values)

    // Perform any necessary actions, such as sending the login request
    // ...

    // Redirect to the dashboard or display an error message
    // ...
  }

  return (
    <main className='grid xl:grid-cols-2 lg:grid-cols-2 lg:gap-8'>
      <section className='relative '>
        <Image
          src={'/img1.jpg'}
          alt='Login aside'
          width={100}
          height={100}
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

      <section className='flex flex-col justify-between items-start gap-5 my-auto 2xl:h-[50%] 2xl:w-[80%] xl:w-[80%] xl:h-[60%] '>
        <header className='flex flex-col gap-4'>
          <h1 className='2xl:text-5xl lg:text-3xl md:text-2xl sm:text-xl font-bold'>
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
                type='email'
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
                  className='absolute right-3 xl:top-[11px]'
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

            <div className='flex lg:flex-row lg:justify-between lg:items-center '>
              <div className=''>
                <Field type='checkbox' name='rememberMe' id='rememberMe' />{' '}
                Remember me
              </div>
              <Link
                href={'/forgetpassword'}
                className='border-0 font-medium text-red-600'
              >
                Forget your password
              </Link>
            </div>

            <button
              type='submit'
              className='h-[45px] w-full rounded-lg bg-red-500 text-white font-medium'
            >
              Login
            </button>
          </Form>
        </Formik>

        <div className='flex justify-center items-center gap-1 '>
          <span className='font-medium'>Don&#39;t have an account?</span>
          <Link href={'/signup'} className='text-red-500 font-medium underline'>
            Signup
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Login
