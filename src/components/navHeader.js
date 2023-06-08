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
import { setToken } from '@/slice/userSlice'
import Image from 'next/image'

const NavHeader = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const token = useSelector((state) => state.user.token)
  const userProfile = useSelector((state) => state.user.userProfile)

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
      })

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
    const token = localStorage.getItem('token')
    dispatch(setToken(token || null)) // Set token to null if undefined
  }, [dispatch])

  return (
    <main className=''>
      <nav className='relative w-full bg-[#023047] text-white shadow-xl flex justify-between items-center px-10 h-[80px] md:flex md:px-5 sm:flex sm:px-5 '>
        <div className='xl:flex xl:flex-row xl:justify-start md:flex md:flex-row md:justify-between sm:flex sm:justify-between items-center gap-10 w-full'>
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
            <Link href={'/trending'}>Trending</Link>
            {token && <Link href={'/dashboard'}>Dashboard</Link>}
          </div>

          <button
            type='button'
            onClick={() => setShowModal(!showModal)}
            className='xl:hidden md:flex sm:flex'
          >
            <FontAwesomeIcon icon={faBarsStaggered} className='text-[25px] ' />
          </button>
        </div>

        <div className='lg:flex 2xl:justify-between 2xl:items-center 2xl:w-[30%] xl:w-[45%] xl:justify-between lg:w-[45%] lg:justify-between md:hidden sm:hidden  '>
          {token && (
            <button type='button' className='relative'>
              <FontAwesomeIcon icon={faMessage} className='text-[30px] ' />
              <span className='absolute bg-[#ef476f] top-0 -right-1 p-[5px] rounded-full'></span>
            </button>
          )}
          {token && (
            <button type='button' className='relative'>
              <FontAwesomeIcon icon={faBell} className='text-[30px] ' />
              <span className='absolute bg-[#ef476f] top-0 right-0 p-[6px] rounded-full'></span>
            </button>
          )}
          <Link href={'/profile'}>
            {token ? (
              <Image
                src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
                alt='Profile Picture'
                width={100}
                height={100}
                className='rounded-full 2xl:h-[50px] 2xl:w-[50px] xl:w-[50px] xl:h-[50px] md:w-[100px] md:h-[100px] sm:w-[80px] sm:h-[80px] border-2 object-cover '
              />
            ) : (
              <FontAwesomeIcon icon={faUser} className='text-[25px]' />
            )}
          </Link>
          {token && (
            <button
              type='button'
              className='bg-[#ef476f] text-white h-[45px] 2xl:px-5 xl:px-5 md:px-2 rounded-lg shadow-2xl font-medium '
            >
              Add Listing
            </button>
          )}

          {token && (
            <button
              type='button'
              onClick={handleLogout}
              className='bg-[#ef476f] text-white font-medium h-[45px] px-4 rounded-lg '
            >
              Logout
            </button>
          )}

          {!token && (
            <div className='xl:flex md:flex sm:hidden flex-row gap-5 '>
              <Link
                href={'/login'}
                className='bg-[#ef476f] text-white font-medium h-[45px] px-4 rounded-lg flex justify-center items-center '
              >
                Login
              </Link>

              <Link
                href={'/signup'}
                className='bg-[#ef476f] text-white font-medium h-[45px] px-4 rounded-lg flex justify-center items-center '
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>

      {showModal && (
        <nav className='flex flex-col justify-start items-start gap-5 absolute top-0 left-0 bg-[#000000e4] rounded-lg h-screen w-full mx-auto z-10 text-white'>
          <header className='flex justify-between w-full p-5'>
            <Link href={'/'} className='logo font-bold text-2xl'>
              Untitlted
            </Link>

            <button type='button' onClick={() => setShowModal(false)}>
              <FontAwesomeIcon
                icon={faClose}
                className='sm:text-[25px] md:text-[35px]'
              />
            </button>
          </header>

          <article className='flex flex-col justify-start items-start gap-5 px-5 font-medium w-full text-lg'>
            <Link href={'/rent'}>Rent</Link>
            <Link href={'/sell'}>Sell</Link>
            <Link href={'/buy'}>Buy</Link>
            <Link href={'/trending'}>Trending</Link>
            {token && <Link href={'/dashboard'}>Dashboard</Link>}
            {token && (
              <Link
                href={'/messages'}
                className='flex justify-between items-center relative w-full'
              >
                Messages
                <span className='bg-red-600 rounded-full w-[20px] h-[20px] absolute right-0 top-2 flex justify-center items-center text-sm '>
                  3
                </span>
              </Link>
            )}
            {token && (
              <Link
                href={'/notification'}
                className='flex justify-between items-center relative w-full'
              >
                Notifications
                <span className='bg-red-600 rounded-full w-[20px] h-[20px] absolute right-0 top-2 flex justify-center items-center text-sm '>
                  1
                </span>
              </Link>
            )}
            {token && (
              <Link
                href={'/profile'}
                className='flex justify-between items-center'
              >
                Profile
              </Link>
            )}
            {token && (
              <button
                type='button'
                className='bg-red-500 h-[45px] w-full rounded-lg shadow-2xl font-medium text-white hover:bg-black  '
              >
                Post a house{' '}
              </button>
            )}

            {token && (
              <button
                type='button'
                onClick={handleLogout}
                className='bg-[#ef476f] text-white font-medium h-[45px] px-4 rounded-lg w-full flex justify-center items-center '
              >
                Logout
              </button>
            )}

            {!token && (
              <div className='flex flex-col gap-5 w-full '>
                <Link
                  href={'/login'}
                  onClick={handleLogout}
                  className='bg-[#ef476f] text-white h-[45px] px-5 font-semibold rounded-lg flex justify-center items-center '
                >
                  Login
                </Link>

                <Link
                  href={'/signup'}
                  onClick={handleLogout}
                  className='bg-[#ef476f] text-white h-[45px] px-5 font-semibold rounded-lg flex justify-center items-center '
                >
                  Register
                </Link>
              </div>
            )}
          </article>
        </nav>
      )}
    </main>
  )
}

export default NavHeader
