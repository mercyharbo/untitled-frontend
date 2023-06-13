import PriceRangeFilter from '@/hooks/BudgetRangeSlider'
import Image from 'next/image'
import { useState } from 'react'

const FilterListings = ({ handleFilter }) => {
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
  const [propertyType, setPropertyType] = useState('')
  const [budget, setBudget] = useState({})
  const [selectedRooms, setSelectedRooms] = useState([])
  const [selectedBathrooms, setSelectedBathrooms] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type)
  }

  const handleBudgetChange = (value) => {
    setBudget(value)
  }

  const handleRoomChange = (room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(selectedRooms.filter((item) => item !== room))
    } else {
      setSelectedRooms([...selectedRooms, room])
    }
  }

  const handleBathroomChange = (bathroom) => {
    if (selectedBathrooms.includes(bathroom)) {
      setSelectedBathrooms(
        selectedBathrooms.filter((item) => item !== bathroom)
      )
    } else {
      setSelectedBathrooms([...selectedBathrooms, bathroom])
    }
  }

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, 6)

  const handleReset = () => {
    setPropertyType('')
    setBudget({})
    setSelectedRooms([])
    setSelectedBathrooms([])
    setSelectedAmenities([])
  }


  return (
    <main className='w-full flex flex-col gap-5 lg:p-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='lg:text-xl '>Property Type</h1>
        <header className='grid  lg:grid-cols-2 lg:gap-4 md:grid-cols-4 md:gap-5 sm:gap-2 cursor-pointer '>
          <div
            className={`bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              propertyType === 'housing' ? 'bg-[#F30A49]' : 'bg-white'
            }`}
            onClick={() => handlePropertyTypeChange('housing')}
          >
            <Image
              src={'/filterImage1.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Housing</span>
          </div>
          <div
            className={`bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              propertyType === 'commercial' ? 'bg-[#F30A49]' : 'bg-white'
            }`}
            onClick={() => handlePropertyTypeChange('commercial')}
          >
            <Image
              src={'/filterImage4.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Commercial</span>
          </div>
          <div
            className={`bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              propertyType === 'lands' ? 'bg-[#F30A49]' : 'bg-white'
            }`}
            onClick={() => handlePropertyTypeChange('lands')}
          >
            <Image
              src={'/filterImage3.png'}
              alt='Homes png'
              width={500}
              height={500}
              className='lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] '
            />
            <span className=''>Lands</span>
          </div>
          <div
            className={`bg-[#e7ecef] shadow-2xl rounded-lg p-2 flex flex-col justify-center items-center gap-2 ${
              propertyType === 'apartment' ? 'bg-[#F30A49]' : 'bg-white'
            }`}
            onClick={() => handlePropertyTypeChange('apartment')}
          >
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
          <PriceRangeFilter onChange={handleBudgetChange} />
        </div>

        <div className='flex flex-col gap-5'>
          <h1>Property Type</h1>
          <div className='flex gap-4'>
            <button
              className={`bg-transparent border py-2 px-4 rounded-md ${
                propertyType === 'newlyBuilt' ? 'bg-[#F30A49]' : ''
              }`}
              onClick={() => handlePropertyTypeChange('newlyBuilt')}
            >
              Newly Built
            </button>
            <button
              className={`bg-transparent border py-2 px-4 rounded-md ${
                propertyType === 'usedProperty' ? 'bg-[#F30A49]' : ''
              }`}
              onClick={() => handlePropertyTypeChange('usedProperty')}
            >
              Used Property
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className=''>Bedrooms</h1>
        <div className='flex gap-5'>
          {numbers.map((num, index) => {
            const isSelected = selectedRooms.includes(num)
            return (
              <button
                key={index}
                type='button'
                className={`bg-transparent border p-1 px-3 rounded-md ${
                  isSelected ? 'bg-[#F30A49]' : ''
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
        <div className='flex gap-5'>
          {numbers.map((num, index) => {
            const isSelected = selectedBathrooms.includes(num)
            return (
              <button
                key={index}
                type='button'
                className={`bg-transparent border p-1 px-3 rounded-md ${
                  isSelected ? 'bg-[#F30A49]' : ''
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
        <button
          type='button'
          className='bg-[#F30A49] text-white font-semibold border py-2 px-4 rounded-md'
        >
          Reset
        </button>
        <button
          type='button'
          onClick={() =>
            handleFilter({
              propertyType,
              budget,
              selectedRooms,
              selectedBathrooms,
              selectedAmenities,
            })
          }
          className='bg-[#F30A49] text-white font-semibold border py-2 px-4 rounded-md'
        >
          Save
        </button>
      </div>
    </main>
  )
}

export default FilterListings
