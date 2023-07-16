import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import { fetchSearch, setSearchQuery } from '@/slice/searchSlice'

const Search = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state) => state.search.searchQuery)
  const searchedData = useSelector((state) => state.search.searchedData)

  const getSearchedUsers = async () => {
    try {
      await dispatch(fetchSearch(searchQuery))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        getSearchedUsers()
      }
    }, 500) // Adjust the delay duration (in milliseconds) to your desired value

    return () => {
      clearTimeout(delayTimer) // Clear the timeout when component unmounts or searchQuery changes
    }
  }, [searchQuery])

  return (
    <main className='relative xl:w-[50%] md:w-[50%] sm:w-full'>
      <input
        type='text'
        name='search'
        autoComplete='off'
        placeholder='Search estate agent'
        className='h-[55px] lg:w-[400px] md:w-[400px] sm:w-full sm:h-[55px] py-4 rounded-full outline-none border-2 border-color2 focus:border-hover indent-3 '
        value={searchQuery}
        onChange={(e) => {
          dispatch(setSearchQuery(e.target.value))
        }}
      />

      {searchQuery && (
        <div className='w-full h-[400px] absolute top-20 left-0 p-2 rounded-lg shadow-2xl bg-white z-20 flex flex-col gap-3 '>
          {searchedData?.users?.map((foundUsers) => {
            return (
              <Link
                key={foundUsers._id}
                href={`/users/${foundUsers._id}`}
                onClick={() => dispatch(setSearchQuery(''))}
                className='flex justify-start items-center gap-2 bg-white shadow-2xl p-2 rounded-lg w-full h-[60px] '
              >
                <Image
                  src={foundUsers.avatarUrl}
                  alt={foundUsers.username}
                  width={500}
                  height={500}
                  className='md:w-[70px] md:h-[70px] sm:h-[50px] sm:w-[50px] rounded-full object-cover border-2 border-color3 '
                />
                <div className='flex flex-col gap-1'>
                  <div className='flex flex-col'>
                    <h1 className=' xl:text-lg md:text-lg sm:text-sm font-medium'>
                      {foundUsers.firstname} {foundUsers.lastname}
                    </h1>
                    <span className='text-[12px] text-[gray]'>
                      @{foundUsers.username}
                    </span>
                  </div>
                  <span className='text-[12px] text-[gray]'>
                    {foundUsers.city}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Search
