import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

import InputField from '@/hooks/InputField'
import Button from '@/hooks/button'
import Image from 'next/image'
import { setSelectedImage } from '@/slice/userSlice'

const SignupStep2 = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(false)

  const { email } = useSelector((state) => state.signup)
  const selectedImage = useSelector((state) => state.user.selectedImage)

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    first_name: Yup.string().required('Firstname is required'),
    last_name: Yup.string().required('Lastname is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsloading(true)
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/signup`,
        {
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
            avatarUrl: selectedImage,
          }),
        }
      )

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        const base64Image = reader.result
        dispatch(setSelectedImage(base64Image))
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className='flex flex-col gap-5 3xl:w-[90%]  '>
      {/* <p className='text-base text-left flex justify-start items-start xl:pl-[6rem] md:pl-5 sm:pl-5 '>
        Fill out the following details to complete your registration.
      </p> */}

      <div className='flex justify-start items-center gap-4 lg:flex-row md:flex-row sm:flex-row'>
        <Image
          src={selectedImage || '/avatar.jpg'}
          alt='Profile Picture'
          width={1000}
          height={1000}
          className='rounded-full bg-hover object-cover 2xl:h-[150px] 2xl:w-[150px] xl:w-[130px] xl:h-[130px] md:w-[120px] 
          md:h-[120px] sm:w-[100px] sm:h-[100px] '
        />
        <div className='flex flex-row justify-start items-start gap-5'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
            id='upload-input'
          />
          <label
            htmlFor='upload-input'
            className='border h-[40px] px-4 rounded-lg font-semibold cursor-pointer flex justify-center items-center hover:bg-[#F30A49] hover:text-white'
          >
            Upload
          </label>
        </div>
      </div>

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
        {() => (
          <Form className='flex flex-col gap-5 w-full px-5 '>
            <div className='flex flex-col justify-start items-start gap-2'>
              <label htmlFor='username' className='font-medium'>
                Username
              </label>
              <div className='w-full'>
                <InputField
                  type='username'
                  name='username'
                  id='username'
                  placeholder='Enter your username'
                  className='w-full'
                />
              </div>
            </div>

            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              <label htmlFor='password' className='font-medium'>
                Password
              </label>
              <div className='w-full'>
                <InputField
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter your password'
                  className='w-full'
                />
              </div>
            </div>

            <div className='grid lg:grid-cols-2 lg:gap-5'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='username' className='font-medium'>
                  Firstname
                </label>
                <div className='w-full'>
                  <InputField
                    type='first_name'
                    name='first_name'
                    id='first_name'
                    placeholder='Enter your firstname'
                    className='w-full'
                  />
                </div>
              </div>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='username' className='font-medium'>
                  Lastname
                </label>
                <div className='w-full'>
                  <InputField
                    type='last_name'
                    name='last_name'
                    id='last_name'
                    placeholder='Enter your lastname'
                    className='w-full'
                  />
                </div>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-5'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='state' className='font-medium'>
                  State
                </label>
                <div className='w-full'>
                  <InputField
                    type='text'
                    name='state'
                    id='state'
                    placeholder='Enter your state'
                    className='w-full'
                  />
                </div>
              </div>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='city' className='font-medium'>
                  City
                </label>
                <div className='w-full'>
                  <InputField
                    type='text'
                    name='city'
                    id='city'
                    placeholder='Enter your city'
                    className='w-full'
                  />
                </div>
              </div>
            </div>

            <div className='grid 2xl:grid-cols-2 gap-5 w-full'>
              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='address' className='font-medium'>
                  Address
                </label>
                <div className='w-full'>
                  <InputField
                    type='text'
                    name='address'
                    id='address'
                    placeholder='Enter your address'
                    className='w-full'
                  />
                </div>
              </div>

              <div className='flex flex-col justify-start items-start gap-2'>
                <label htmlFor='phoneNumber' className='font-medium'>
                  Phone Number
                </label>
                <div className='w-full'>
                  <InputField
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='Enter your phone number'
                    className='w-full'
                  />
                </div>
              </div>
            </div>

            <Button
              label={isLoading ? 'Creating account...' : 'Create account'}
              type='submit'
              // disabled={isLoading || isSubmitting}
              className='rounded-md h-[50px]'
            />

            {errorMsg && (
              <span className='font-medium text-sm' style={{ color: 'red' }}>
                {errorMsg}
              </span>
            )}

            <p className='text-sm'>
              By submitting, I accept to the{' '}
              <Link href={'/terms&condition'} className='text-[#F30A49] '>
                terms of use
              </Link>
              .
            </p>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default SignupStep2
