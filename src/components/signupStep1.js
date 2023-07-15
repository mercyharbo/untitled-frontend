import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { setEmail } from '@/slice/singupSlice'
import Button from '@/hooks/button'
import InputField from '@/hooks/InputField'

const SignupStep1 = ({ onNext }) => {
  const dispatch = useDispatch()
  const email = useSelector((state) => state.signup.email)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  })

  return (
    <main className='flex flex-col justify-between items-start gap-10 2xl:h-[40%] xl:px-10 xl:h-[40%] md:p-10 sm:p-5 '>
      <header className='flex flex-col gap-5'>
        <h1 className='2xl:text-4xl lg:text-2xl md:text-xl sm:text-xl font-bold'>
          Create an account
        </h1>
        <p className='text-base'>
          Lets get you started with setting up an account with us, so you can
          start buying, selling, and leasing your homes.
        </p>
      </header>

      <Formik
        initialValues={{
          email: email,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setEmail(values.email))
          onNext()
        }}
      >
        <Form className='flex flex-col gap-5 w-full'>
          <div className='flex flex-col justify-start items-start gap-2 '>
            <label htmlFor='email' className='font-medium'>
              Email
            </label>
            <div className='w-full'>
              <InputField
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                autoComplete='off'
                className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
              />
            </div>
          </div>

          <Button label='Continue' type='submit' name='continue' className='rounded-md h-[50px] ' />

          <p className='text-sm'>
            By submitting, I accept Untitled {''}
            <Link
              href={'terms&condition'}
              className='text-hover underline font-medium'
            >
              terms of use
            </Link>
            .
          </p>

          <div className='flex justify-start items-start gap-2 text-sm '>
            <span className='font-medium'>Already have an account?</span>
            <Link href={'/login'} className='text-hover font-medium underline'>
              Login
            </Link>
          </div>
        </Form>
      </Formik>
    </main>
  )
}

export default SignupStep1
