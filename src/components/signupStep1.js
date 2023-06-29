import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { setEmail } from '@/slice/singupSlice'

const SignupStep1 = ({ onNext }) => {
  const dispatch = useDispatch()
  const email = useSelector((state) => state.signup.email)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: email,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setEmail(values.email))
      onNext()
    },
  })

  return (
    <main
      className='flex flex-col justify-between items-start gap-5 2xl:h-[40%] xl:px-10 xl:h-[40%] md:p-10 sm:p-5 '
    >
      <header className='flex flex-col gap-4'>
        <h1 className='2xl:text-4xl lg:text-2xl md:text-xl sm:text-lg font-bold'>
          Create an account
        </h1>
        <p className='text-base'>
          Lets get you started with setting up an account with us, so you can
          start buying, selling, and leasing your homes.
        </p>
      </header>

      <form
        className='flex flex-col gap-5 w-full'
        onSubmit={formik.handleSubmit}
      >
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500'>{formik.errors.email}</div>
          )}
        </div>

        <button
          type='submit'
          className='h-[45px] w-full rounded-lg bg-[#ffb703] text-black font-semibold hover:bg-black hover:text-white'
        >
          Continue
        </button>

        <p className='text-sm'>
          By submitting, I accept Untitled {''}
          <Link
            href={'terms&condition'}
            className='text-[#023047] underline font-medium'
          >
            terms of use
          </Link>
          .
        </p>

        <div className='flex justify-start items-start gap-2 '>
          <span className='font-medium'>Already have an account?</span>
          <Link href={'/login'} className='text-[#023047] font-medium underline'>
            Login
          </Link>
        </div>
      </form>
    </main>
  )
}

export default SignupStep1
