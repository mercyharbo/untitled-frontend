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
        placeholder='Search estate agent'
        className='h-[55px] lg:w-[400px] md:w-[400px] sm:w-full sm:h-[55px] py-4 rounded-full outline-none border-2 border-color2 focus:border-hover indent-3 '
        value={searchQuery}
        onChange={(e) => {
          dispatch(setSearchQuery(e.target.value))
        }}
      />

      {searchQuery && (
        <div className='w-full h-auto absolute top-20 left-0 p-5 rounded-lg shadow-2xl bg-white z-20 flex flex-col gap-5 '>
          {searchedData?.users?.map((foundUsers) => {
            return (
              <Link
                key={foundUsers._id}
                href={`/users/${foundUsers._id}`}
                onClick={() => dispatch(setSearchQuery(''))}
                className='flex justify-start items-center gap-5 bg-white shadow-2xl p-2 rounded-lg w-full'
              >
                <Image
                  src={foundUsers.avatarUrl}
                  alt={foundUsers.username}
                  width={500}
                  height={500}
                  className='h-[70px] w-[70px] rounded-full object-cover '
                />
                <div className='flex flex-col gap-1'>
                  <h1 className='text-xl font-semibold'>
                    {foundUsers.firstname} {foundUsers.lastname}
                  </h1>
                  <span className='text-sm text-[gray]'>
                    @{foundUsers.username}
                  </span>
                  <span className='text-sm text-[gray]'>
                    {foundUsers.address}
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
