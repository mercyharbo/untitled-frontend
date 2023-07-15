import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import {
  faHouse,
  faBell,
  faMessage,
  faBuildingShield,
  faGear,
  faPowerOff,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { logout } from '@/slice/logoutSlice'

const SideBarNavigation = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const token = useSelector((state) => state.user.token)

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main
      className='2xl:w-[17%] 2xl:flex xl:w-[17%] xl:flex lg:w-[17%] lg:flex md:hidden sm:hidden py-10 h-screen bg-white p-5 
     flex-col justify-between items-start fixed top-0 left-0 after:absolute after:h-full after:w-10 after:border-r-[1px] after:right-0 after:top-0  
     after:border-color2  '
    >
      <Link
        href={'/'}
        className='font-extrabold capitalize 2xl:text-4xl xl:text-2xl lg:2xl md:text-xl sm:text'
      >
        Untitlted
      </Link>

      <div className='flex-col gap-2 justify-between text-lg font-semibold text-gray-500 w-full 2xl:h-[40%] xl:h-[50%] lg:h-[55%] flex'>
        <Link
          href={'/listings'}
          className={
            router.pathname === '/listings'
              ? 'active relative px-4 text-red-500 bg-[#100f0f1f] h-[50px] flex justify-start items-center gap-3 after:absolute after:border-l-4 after:w-4 after:h-full after:border-red-500 after:left-0 after:top-0 '
              : 'h-[50px] px-4 flex justify-start items-center gap-3 hover:bg-[#100f0f1f] hover:w-full '
          }
        >
          <FontAwesomeIcon icon={faHouse} />
          Listings
        </Link>
        <Link
          href={'/rent'}
          className={
            router.pathname === '/rent'
              ? 'active relative px-4 text-red-500 bg-[#100f0f1f] h-[50px] flex justify-start items-center gap-3 after:absolute after:border-l-4 after:w-4 after:h-full after:border-red-500 after:left-0 after:top-0 '
              : 'h-[50px] px-4 flex justify-start items-center gap-3 hover:bg-[#100f0f1f] hover:w-full '
          }
        >
          <FontAwesomeIcon icon={faStar} />
          Rent
        </Link>
        <Link
          href={'/sell'}
          className={
            router.pathname === '/sell'
              ? 'active relative px-4 text-red-500 bg-[#100f0f1f] h-[50px] flex justify-start items-center gap-3 after:absolute after:border-l-4 after:w-4 after:h-full after:border-red-500 after:left-0 after:top-0 '
              : 'h-[50px] px-4 flex justify-start items-center gap-3 hover:bg-[#100f0f1f] hover:w-full '
          }
        >
          <FontAwesomeIcon icon={faBuildingShield} />
          Sell
        </Link>
        <Link
          href={'/message'}
          className={
            router.pathname === '/message'
              ? 'active relative px-4 text-red-500 bg-[#100f0f1f] h-[50px] flex justify-start items-center gap-3 after:absolute after:border-l-4 after:w-4 after:h-full after:border-red-500 after:left-0 after:top-0 '
              : 'h-[50px] px-4 flex justify-start items-center gap-3 hover:bg-[#100f0f1f] hover:w-full '
          }
        >
          <FontAwesomeIcon icon={faMessage} />
          Message
        </Link>
        <Link
          href={'/notification'}
          className={
            router.pathname === '/notification'
              ? 'active relative px-4 text-red-500 bg-[#100f0f1f] h-[50px] flex justify-start items-center gap-3 after:absolute after:border-l-4 after:w-4 after:h-full after:border-red-500 after:left-0 after:top-0 '
              : 'h-[50px] px-4 flex justify-start items-center gap-3 hover:bg-[#100f0f1f] hover:w-full '
          }
        >
          <FontAwesomeIcon icon={faBell} />
          Notification
        </Link>

        <Link
          href={'/settings'}
          className={
            router.pathname === '/settings'
              ? 'active relative px-4 text-red-500 bg-[#100f0f1f] h-[50px] flex justify-start items-center gap-3 after:absolute after:border-l-4 after:w-4 after:h-full after:border-red-500 after:left-0 after:top-0 '
              : 'h-[50px] px-4 flex justify-start items-center gap-3 hover:bg-[#100f0f1f] hover:w-full '
          }
        >
          <FontAwesomeIcon icon={faGear} />
          Settings
        </Link>
      </div>

      <button
        type='button'
        onClick={handleLogout}
        className='text-black flex items-center gap-3'
      >
        <FontAwesomeIcon icon={faPowerOff} />
        Logout
      </button>

      {showModal && (
        <motion.nav
          initial='closed'
          animate={showModal ? 'open' : 'closed'}
          variants={variants}
          transition={{ duration: 0.5 }}
          className='flex flex-col justify-start items-start gap-5 absolute top-0 left-0 bg-white h-screen w-[70%] mx-auto z-10 text-black'
        >
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
            {token && <Link href={'/listings'}>Listings</Link>}
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
                onClick={() => dispatch(setAddListingModal(true))}
                className='bg-red-500 h-[45px] w-full rounded-lg shadow-2xl font-medium text-white hover:bg-black  '
              >
                Add Listing
              </button>
            )}

            {token && (
              <button
                type='button'
                onClick={handleLogout}
                className='bg-[#F30A49] text-white font-medium h-[45px] px-4 rounded-lg w-full flex justify-center items-center '
              >
                Logout
              </button>
            )}
          </article>
        </motion.nav>
      )}
    </main>
  )
}

export default SideBarNavigation
