import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const NavHeader = () => {
  return (
    <nav className='w-full bg-white shadow-xl flex justify-between items-center px-10 h-[80px] '>
      <div className='flex flex-row justify-start items-center gap-10'>
        <h1 className='logo font-bold text-2xl'>Untitlted</h1>

        <div className='flex flex-row gap-5'>
          <Link href={'/'}>Browse</Link>
          <Link href={'/'}>Discover</Link>
          <Link href={'/'}>Hot</Link>
          <Link href={'/'}>Featured</Link>
        </div>
      </div>

      <div className='flex gap-10'>
        <input
          type='text'
          name='search'
          id='search'
          autoComplete='off'
          placeholder='Search by address, and people... '
          className='border-2 border-gray-400 h-[45px] xl:w-[300px] rounded-lg indent-2 placeholder:text-sm outline-none '
        />
        <button type='button' className='relative'>
          <FontAwesomeIcon icon={faMessage} className='text-[25px] ' />
          <span className='absolute bg-red-600 top-1 -right-1 p-[5px] rounded-full'></span>
        </button>
        <button type='button' className='relative'>
          <FontAwesomeIcon icon={faBell} className='text-[25px] ' />
          <span className='absolute bg-red-600 top-2 right-0 p-[5px] rounded-full'></span>
        </button>
        <button type='button'>
          <FontAwesomeIcon icon={faUser} className='text-[25px] ' />
        </button>
        <button
          type='button'
          className='bg-red-500 h-[45px] px-4 rounded-lg shadow-2xl font-medium text-white hover:bg-black  '
        >
          Post your house{' '}
        </button>
      </div>
    </nav>
  )
}

export default NavHeader
