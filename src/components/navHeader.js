import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { faBarsStaggered, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUserProfile } from '@/slice/userSlice'

import { setLoading } from '@/slice/listingSlice'

const NavHeader = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const token = useSelector((state) => state.user.token)

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/logout`,
        {
          method: 'POST',
        }
      )

      const data = await response.json()
      console.log(data.status, 'data status...')

      if (data.status === true) {
        localStorage.removeItem('token')
        dispatch(setToken(null)) // Update token to null
        router.push('/login')
      }
    } catch (error) {
      console.error('An error occurred during logout', error)
    }
  }

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT_RENDER}/api/profile?userId=${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (data?.status === true) {
          dispatch(setUserProfile(data.profile))
          dispatch(setLoading(false))
        } else {
          dispatch(setLoading(false))
          // setErrorMsg(data.error)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getUserProfile()
  }, [dispatch])

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(setToken(token || null)) // Set token to null if undefined
  }, [dispatch])

  return (
    <main>
      <nav className=' w-full flex justify-between items-center h-[80px] 2xl:px-10 md:flex md:px-5 sm:flex sm:px-5 '>
        <div className='xl:flex xl:flex-row xl:justify-start xl:w-auto md:flex md:flex-row md:justify-between md:w-full sm:flex sm:justify-between sm:w-full items-center gap-10 '>
          <Link
            href={'/'}
            className='logo font-bold xl:text-2xl lg:2xl md:text-xl sm:text'
          >
            Untitlted
          </Link>

          <div className='xl:flex md:flex sm:hidden flex-row gap-5 '>
            <Link href={'/rent'}>Rent</Link>
            <Link href={'/sell'}>Sell</Link>
            <Link href={'/buy'}>Buy</Link>
            {token && <Link href={'/listings'}>Listings</Link>}
          </div>

          <button
            type='button'
            onClick={() => setShowModal(!showModal)}
            className='xl:hidden md:flex sm:flex'
          >
            <FontAwesomeIcon icon={faBarsStaggered} className='text-[25px] ' />
          </button>
        </div>

        <div className='lg:flex 2xl:justify-between 2xl:items-center 2xl:gap-6 xl:justify-between xl:gap-5 lg:gap-5 lg:justify-between md:hidden sm:hidden  '>
          {token && (
            <Link
              href='/profile'
              className='bg-transparent border text-black font-medium h-[45px] px-6 rounded-full flex justify-center items-center hover:bg-[#F30A49] hover:border-none '
            >
              Profile
            </Link>
          )}

          {token && (
            <button
              type='button'
              onClick={handleLogout}
              className='bg-[#F30A49] text-white font-medium h-[45px] px-4 rounded-full '
            >
              Logout
            </button>
          )}

          {!token && (
            <div className='xl:flex md:flex sm:hidden flex-row gap-5 '>
              <Link
                href={'/login'}
                className='bg-transparent text-white font-medium h-[45px] px-4 rounded-full flex justify-center items-center '
              >
                Login
              </Link>

              <Link
                href={'/signup'}
                className='bg-[#F30A49] text-white font-medium h-[45px] px-4 rounded-full flex justify-center items-center '
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>

      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            className='fixed top-0 left-0 z-20 w-full h-screen bg-[#000000bb]'
          ></div>
          <div className='w-[95%] mx-auto rounded-lg h-auto py-5 px-5 bg-white absolute top-0 left-3 z-20'>
            <div className='flex justify-between items-center'>
              <Link href='/' className='text-2xl font-bold'>
                Untitled Realty
              </Link>
              <button type='button' onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faClose} className='text-2xl' />
              </button>
            </div>

            <div className='flex flex-col justify-start items-start gap-2 py-10 font-medium'>
              <Link
                href='/listings'
                className='h-[50px] hover:bg-color2 flex justify-start items-center pl-2 w-full rounded-md '
              >
                Listings
              </Link>
              <Link
                href='/rent'
                className='h-[50px] hover:bg-color2 flex justify-start items-center pl-2 w-full rounded-md '
              >
                Rent
              </Link>
              <Link
                href='/sell'
                className='h-[50px] hover:bg-color2 flex justify-start items-center pl-2 w-full rounded-md '
              >
                Sell
              </Link>
              <Link
                href='/profile'
                className='h-[50px] hover:bg-color2 flex justify-start items-center pl-2 w-full rounded-md '
              >
                Profile
              </Link>
            </div>

            {token && (
              <button
                type='button'
                onClick={handleLogout}
                className='bg-color3 h-[50px] w-full text-white rounded-lg '
              >
                Logout
              </button>
            )}

            {!token && (
              <div className='flex flex-col gap-2'>
                <Link
                  href='/login'
                  className='bg-transparent border h-[50px] w-full text-black rounded-lg '
                >
                  Login
                </Link>
                <Link
                  href='/signup'
                  className='bg-color3 h-[50px] w-full text-white rounded-lg '
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  )
}

export default NavHeader
