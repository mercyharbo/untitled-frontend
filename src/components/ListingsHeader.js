import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSearchListing } from '@/slice/searchSlice'

const CategoriesData = [
  { id: 1, name: 'All' },
  { id: 2, name: 'House' },
  { id: 3, name: 'Apartment' },
  { id: 4, name: 'House' },
  { id: 5, name: 'Villa' },
  { id: 6, name: 'Self-contain' },
  { id: 7, name: 'Duplex' },
  { id: 8, name: 'Bungalow' },
]

const ListingHeader = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(CategoriesData)
  const [selectedCategoryId, setSelectedCategoryId] = useState(1)

  // Function to handle category selection
  const handleCategorySelection = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  const listing = useSelector((state) => state.listings.listings)
  const searchListing = useSelector((state) => state.search.searchListing)

  return (
    <main className='flex flex-col gap-5 py-5'>
      <article className='flex xl:flex-row xl: sm:flex-col sm:gap-5'>
        <h1 className='flex justify-start items-center gap-2 2xl:text-2xl xl:text-2xl xl:w-[50%] lg:text-2xl'>
          Properties{' '}
          <span className='text-base text-[gray] font-medium'>
            {listing?.length} Results
          </span>
        </h1>

        <div className='xl:w-[50%] xl:ml-auto '>
          <input
            type='text'
            name='search'
            placeholder='Search House, Apartment, etc'
            className='w-full indent-5 bg-transparent py-4 rounded-lg outline-none border-2 border-color2 focus:border-hover '
            style={{ borderRadius: '100px' }}
            value={searchListing}
            onChange={(e) => {
              dispatch(setSearchListing(e.target.value))
            }}
          />
        </div>
      </article>

      <div className='category-container flex flex-row gap-5 px-5 overflow-x-auto whitespace-nowrap scroll-none '>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${
              selectedCategoryId === category.id
                ? 'cursor-pointer bg-color3 text-white h-[50px] px-5 flex justify-center items-center rounded-full font-medium '
                : 'flex justify-center items-center font-medium cursor-pointer bg-color2 h-[50px] px-5 rounded-full hover:bg-hover hover:text-white '
            } category-item`}
            onClick={() => handleCategorySelection(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </main>
  )
}

export default ListingHeader
