import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PriceRangeFilter from '@/hooks/BudgetRangeSlider'
import { setFilteredListing, setListings } from '@/slice/listingSlice'

const FilterListings = () => {
  const dispatch = useDispatch()

  const numbers = [1, 2, 3, 4, 5]

  const amenitiesJSON = [
    'Swimming pool',
    'Garden',
    'Garage',
    'Fireplace',
    'Balcony',
    'Fitness center',
    'Home theater',
    'Study room',
    'Laundry room',
    'Walk-in closet',
    'Smart home technology',
    'Security system',
    'Outdoor BBQ area',
    'Spa or hot tub',
    'Game room',
  ]
  const [isNewProperty, setIsNewProperty] = useState(true)
  const [price, setPrice] = useState({})
  const [bedrooms, setBedrooms] = useState([])
  const [bathroom, setBathroom] = useState([])
  const [amenities, setAmenities] = useState([])
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const listings = useSelector((state) => state.listings.listings)
  // console.log(listings)

  const handlePropertyTypeChange = (type) => {
    setIsNewProperty(type)
  }

  const handlepriceChange = (value) => {
    setPrice(value)
  }

  const handleRoomChange = (room) => {
    if (bedrooms.includes(room)) {
      setBedrooms(bedrooms.filter((item) => item !== room))
    } else {
      setBedrooms([...bedrooms, room])
    }
  }

  const handleBathroomChange = (room) => {
    if (bathroom.includes(room)) {
      setBathroom(bathroom.filter((item) => item !== room))
    } else {
      setBathroom([...bathroom, room])
    }
  }

  const handleAmenityChange = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity))
    } else {
      setAmenities([...amenities, amenity])
    }
  }

  const visibleAmenities = showAllAmenities
    ? amenitiesJSON
    : amenitiesJSON.slice(0, 6)

  const handleReset = () => {
    setIsNewProperty(false)
    setPrice({})
    setBedrooms([])
    setBathroom([])
    setAmenities([])
  }

  const handleFilter = () => {
    // Construct the query based on the selected options
    const query = {
      isNewProperty,
      // price,
      bedrooms,
      bathroom,
      amenities,
    }

    // Convert the query object to a query string
    const queryString = Object.keys(query)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join('&')

    fetch(`${process.env.API_ENDPOINT_DEV}/api/listings?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        // Dispatch the fetched data to the Redux store
        dispatch(setListings(data.listings))
      })
      .catch((error) => {
        console.error('Error fetching filtered listings:', error)
      })
  }

  return (
    <main className='w-full flex flex-col gap-5 lg:p-5'>
      <div className='flex flex-col gap-5'>
        <div className='price'>
          <h1 className=''> price </h1>
          <PriceRangeFilter onChange={handlepriceChange} />
        </div>

        <div className='flex flex-col gap-5'>
          <h1>Property Type</h1>
          <div className='flex gap-4'>
            <button
              className={`border py-2 px-4 rounded-md text-sm ${
                isNewProperty === true ? 'bg-[#F30A49] text-white' : ''
              }`}
              onClick={() => handlePropertyTypeChange(true)}
            >
              Newly Built
            </button>
            <button
              className={`border py-2 px-4 rounded-md text-sm ${
                isNewProperty === false ? 'bg-[#F30A49] text-white' : ''
              }`}
              onClick={() => handlePropertyTypeChange(false)}
            >
              Used Property
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className=''>Bedrooms</h1>
        <div className='flex flex-wrap gap-5'>
          {numbers.map((num, index) => {
            const isSelected = bedrooms.includes(num)
            return (
              <button
                key={index}
                type='button'
                className={`border p-1 px-3 rounded-md ${
                  isSelected ? 'bg-[#F30A49] text-white' : ''
                }`}
                onClick={() => handleRoomChange(num)}
              >
                {num}
              </button>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className=''>Bathrooms</h1>
        <div className='flex flex-wrap gap-5'>
          {numbers.map((num, index) => {
            const isSelected = bathroom.includes(num)
            return (
              <button
                key={index}
                type='button'
                className={`border p-1 px-3 rounded-md ${
                  isSelected ? 'bg-[#F30A49] text-white' : ''
                }`}
                onClick={() => handleBathroomChange(num)}
              >
                {num}
              </button>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col justify-start items-start gap-2'>
        <h1 className=''>Amenities</h1>
        <div className='flex flex-col gap-3'>
          {visibleAmenities.map((amenity) => (
            <label key={amenity} className='grid grid-cols-2 gap-10'>
              {amenity}
              <input
                type='checkbox'
                checked={amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className='w-[15px] '
              />
            </label>
          ))}
          {amenities.length > 6 && (
            <button
              className='flex justify-start items-start text-[#F30A49] underline cursor-pointer'
              onClick={() => setShowAllAmenities(!showAllAmenities)}
            >
              {showAllAmenities ? 'See Less' : 'See More'}
            </button>
          )}
        </div>
      </div>

      <div className='flex justify-end items-end gap-4 w-full '>
        <button
          type='button'
          onClick={() => handleReset()}
          className='bg-[#F30A49] text-white font-semibold border py-2 px-4 rounded-md'
        >
          Reset
        </button>
        <button
          type='button'
          onClick={() => handleFilter()}
          className='bg-[#F30A49] text-white font-semibold border py-2 px-4 rounded-md'
        >
          Save
        </button>
      </div>
    </main>
  )
}

export default FilterListings
