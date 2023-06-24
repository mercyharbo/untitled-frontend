import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  faBarsStaggered,
  faClose,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUserProfile } from '@/slice/userSlice'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { setAddListingModal, setLoading } from '@/slice/listingSlice'

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

const NavHeader = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const token = useSelector((state) => state.user.token)
  const userProfile = useSelector((state) => state.user.userProfile)

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
      <nav className=' w-full bg-[#090030] text-white shadow-xl flex justify-between items-center h-[80px] 2xl:px-10 md:flex md:px-5 sm:flex sm:px-5 '>
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
            <button
              type='button'
              onClick={handleLogout}
              className='bg-[#F30A49] text-white font-medium h-[45px] px-4 rounded-lg '
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
    </main>
  )
}

export default NavHeader
