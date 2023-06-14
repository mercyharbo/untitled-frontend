import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

const SignupStep2 = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  const { email } = useSelector((state) => state.signup)

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    first_name: Yup.string().required('Firstname is required'),
    last_name: Yup.string().required('Lastname is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username: values.username,
          password: values.password,
          firstname: values.first_name,
          lastname: values.last_name,
          state: values.state,
          city: values.city,
          address: values.address,
        }),
      })

      const data = await response.json()

      if (data?.status === false) {
        setIsloading(false)
        setErrorMsg(data.error)
      } else {
        setIsloading(false)
        router.push('/listings')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className='flex flex-col justify-between items-start gap-5 2xl:m-auto 2xl:h-[50%] 2xl:w-[80%] xl:px-10 xl:h-full xl:w-full xl:justify-center lg:ml-auto md:px-5 sm:px-5'>
      <header className='flex flex-col gap-4'>
        <p className='text-base lg:w-[80%] '>
          Fill out the following details to complete your registration.
        </p>
      </header>

      <Formik
        initialValues={{
          username: '',
          password: '',
          first_name: '',
          last_name: '',
          state: '',
          city: '',
          address: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-5 w-full'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <label htmlFor='username' className='font-medium'>
                Username
              </label>
              <Field
                type='username'
                name='username'
                id='username'
                placeholder='Enter your username'
                autoComplete='off'
                className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
              />
              <ErrorMessage
                name='username'
                component='div'
                className='font-medium text-red-500'
              />
            </div>

            <div className='flex flex-col justify-start items-start gap-2'>
              <label htmlFor='password' className='font-medium'>
                Password
              </label>
              <Field
                type='password'
                name='password'
                id='password'
                autoComplete='off'
                placeholder='Enter your password'
                className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='font-medium text-red-500'
              />
            </div>

            <div className='grid lg:grid-cols-2 lg:gap-5'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='username' className='font-medium'>
                  Firstname
                </label>
                <Field
                  type='first_name'
                  name='first_name'
                  id='first_name'
                  placeholder='Enter your firstname'
                  autoComplete='off'
                  className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
                />
                <ErrorMessage
                  name='first_name'
                  component='div'
                  className='font-medium text-red-500'
                />
              </div>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='username' className='font-medium'>
                  Lastname
                </label>
                <Field
                  type='last_name'
                  name='last_name'
                  id='last_name'
                  placeholder='Enter your lastname'
                  autoComplete='off'
                  className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
                />
                <ErrorMessage
                  name='last_name'
                  component='div'
                  className='font-medium text-red-500'
                />
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-5'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='state' className='font-medium'>
                  State
                </label>
                <Field
                  type='text'
                  name='state'
                  id='state'
                  placeholder='Enter your state'
                  autoComplete='off'
                  className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
                />
                <ErrorMessage
                  name='state'
                  component='div'
                  className='font-medium text-red-500'
                />
              </div>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='city' className='font-medium'>
                  City
                </label>
                <Field
                  type='text'
                  name='city'
                  id='city'
                  placeholder='Enter your city'
                  autoComplete='off'
                  className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
                />
                <ErrorMessage
                  name='city'
                  component='div'
                  className='font-medium text-red-500'
                />
              </div>
            </div>

            <div className='flex flex-col justify-start items-start gap-2'>
              <label htmlFor='address' className='font-medium'>
                Address
              </label>
              <Field
                type='text'
                name='address'
                id='address'
                autoComplete='off'
                placeholder='Enter your address'
                className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
              />
              <ErrorMessage
                name='address'
                component='div'
                className='font-medium text-red-500'
              />
            </div>

            <button
              type='submit'
              className='h-[40px] w-full rounded-lg bg-blue-500 text-white font-medium cursor-pointer'
              // disabled={isLoading || isSubmitting}
            >
              Create account
            </button>

            {errorMsg && (
              <div className='font-medium text-red-500'>{errorMsg}</div>
            )}
            <p className='text-sm'>
              By submitting, I accept Me
              <Link href={'/terms&condition'}>terms of use</Link>.
            </p>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default SignupStep2
