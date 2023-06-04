import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  const getUserDetails = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user?identifier=${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (data?.status === false) {
        console.log('Signup failed')
        setIsloading(false)
        setErrorMsg(data.message)
      } else {
        console.log('Login successfully')
        setIsloading(false)
        setData(data?.user)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Access the username from the query parameters
    const { username } = router.query

    if (username) {
      getUserDetails(username)
    }
  }, [])

  return (
    <main className='p-10'>
      <h1 className='text-5xl font-semibold'>
        Welcome to <span className='text-red-500'>{data.username},</span>{' '}
      </h1>
    </main>
  )
}

export default Dashboard
