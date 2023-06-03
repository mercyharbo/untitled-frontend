import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const SignupStep2 = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  console.log(email, 'as email')

  const [username, setUsername] = useState('')
  const [first_name, setFirst_Name] = useState('')
  const [last_name, setLast_Name] = useState('')
  const [password, setPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem('signupData')
    if (storedData) {
      const { email } = JSON.parse(storedData)
      setEmail(email)
    }
  }, [])

  // Function to send the POST request
  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          first_name: first_name,
          last_name: last_name,
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
    handleSignup() // Call the login function
  }

  return (
    <main className='flex flex-col justify-between items-start gap-5 2xl:m-auto 2xl:h-[50%] 2xl:w-[80%] xl:px-10 xl:h-full xl:w-full xl:justify-center lg:ml-auto'>
      <header className='flex flex-col gap-4'>
        <p className='text-base lg:w-[80%] '>
          Fill out the following details to complete your resgistration.
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
            autoComplete='off'
            // value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
          />
        </div>

        <div className='grid lg:grid-cols-2 lg:gap-5'>
          <div className='flex flex-col justify-start items-start gap-2'>
            <label htmlFor='username' className='font-medium'>
              Firstname
            </label>
            <input
              type='first_name'
              name='first_name'
              id='first_name'
              placeholder='Enter your firstname'
              autoComplete='off'
              //   value={first_name}
              onChange={(e) => setFirst_Name(e.target.value)}
              className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
            />
          </div>
          <div className='flex flex-col justify-start items-start gap-2'>
            <label htmlFor='username' className='font-medium'>
              Lastname
            </label>
            <input
              type='last_name'
              name='last_name'
              id='last_name'
              placeholder='Enter your lastname'
              autoComplete='off'
              //   value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
              className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
            />
          </div>
        </div>
        <div className='flex flex-col justify-start items-start gap-2'>
          <label htmlFor='password' className='font-medium'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            autoComplete='off'
            placeholder='Enter your password'
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border h-[50px] w-full rounded-lg outline-none indent-3 text-black '
          />
        </div>

        <button
          type='submit'
          className='h-[40px] w-full rounded-lg bg-blue-500 text-white font-medium '
        >
          {isLoading ? 'Create account' : 'Loading...'}
        </button>

        {errorMsg && <li className='font-medium text-red-500'>{errorMsg}</li>}
        <p className='text-sm'>
          By submitting, I accept Me
          <Link href={'/terms&condition'}>terms of use</Link>.
        </p>
      </form>
    </main>
  )
}

export default SignupStep2
