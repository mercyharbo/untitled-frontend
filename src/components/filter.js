import PriceRangeFilter from '@/hooks/BudgetRangeSlider'
import Image from 'next/image'
import { useState } from 'react'

const FilterListings = () => {
  const numbers = [1, 2, 3, 4, 5]

  const amenities = [
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

  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  
  const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, 6)


  return (
    <main className='w-full flex flex-col gap-5 lg:p-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='lg:text-xl '>Property Type</h1>
        <header className='grid  lg:grid-cols-2 lg:gap-4 md:grid-cols-4 md:gap-5 sm:gap-2 '>
          <div className='bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2  '>
            <Image
              src={'/filterImage1.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Housing</span>
          </div>
          <div className='bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2  '>
            <Image
              src={'/filterImage4.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Commercial</span>
          </div>
          <div className='bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2  '>
            <Image
              src={'/filterImage3.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Lands</span>
          </div>
          <div className='bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2  '>
            <Image
              src={'/filterImage5.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Apartment</span>
          </div>
        </header>

        <div className='budget'>
          <h1 className=''> Budget </h1>
          <PriceRangeFilter />
        </div>

        <div className='flex flex-col gap-5'>
          <h1>Property Type</h1>
          <div className='flex gap-4'>
            <button className='bg-transparent border py-2 px-4 rounded-md'>
              Newly Built
            </button>
            <button className='bg-transparent border py-2 px-4 rounded-md'>
              Used Property
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className=''>Bedrooms</h1>
        <div className='flex gap-5'>
          {numbers.map((num, index) => {
            return (
              <button
                key={index}
                type='button'
                className='bg-tranparent border p-1 px-3 rounded-md'
              >
                {num}
              </button>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className=''>Bathrooms</h1>
        <div className='flex gap-5'>
          {numbers.map((num, index) => {
            return (
              <button
                key={index}
                type='button'
                className='bg-tranparent border p-1 px-3 rounded-md'
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
                checked={selectedAmenities.includes(amenity)}
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
        <button className='bg-[#F30A49] text-white font-semibold border py-2 px-4 rounded-md'>
          Reset
        </button>
        <button className='bg-[#F30A49] text-white font-semibold border py-2 px-4 rounded-md'>
          Save
        </button>
      </div>
    </main>
  )
}

export default FilterListings
