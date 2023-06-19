import { faStar } from '@fortawesome/free-regular-svg-icons'
import {
  faBed,
  faBuilding,
  faHeart,
  faLocationDot,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ListView = ({ searchQuery, data }) => {
  const listings = useSelector((state) => state.listings.listings)

  // Filtered listings if data prop is provided
  const filteredListings = data ? data : listings

  return (
    <article
      className='bg-white shadow-2xl rounded-2xl flex w-full lg:flex-col lg:justify-start lg:items-start lg:gap-5 lg:py-5 lg:px-5 md:flex-col 
      md:justify-center md:items-center md:gap-8 md:px-5 sm:flex-col sm:gap-7 sm:px-5 '
    >
      {filteredListings
        .filter((homes) =>
          homes?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
        .map((homes) => {
          const formattedPrice = homes?.price?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'NGN',
          })

          return (
            <Link
              key={homes.id}
              href={`/listings/${homes.id}`}
              className='flex bg-white shadow-2xl rounded-xl relative lg:w-full md:flex-row md:justify-start md:items-center md:gap-5 md:p-5 sm:p-5 sm:flex-col 
                sm:gap-3'
            >
              {/* <div className='bg-[#F30A49] h-[35px] px-4 flex justify-center items-center text-white font-semibold rounded-md absolute 2xl:top-5 2xl:left-5'>
                Featured
              </div> */}
              <Image
                src={homes?.images?.[0]}
                alt='homes'
                width={500}
                height={500}
                className='rounded-lg object-cover md:h-[150px] md:w-[200px] sm:w-[100%] sm:h-[180px]  '
              />
              <div className='flex flex-col gap-5 w-full 2xl:gap-3 xl:gap-4 lg:gap-4 lg:justify-between sm:gap-2 '>
                <div className='flex items-center gap-2 text-gray-500 sm:text-sm '>
                  Posted
                  <p className='lowercase'>
                    {homes.user || 'by Code With Mercy'}
                  </p>
                </div>
                <div className='flex md:justify-between md:items-start sm:justify-between sm:items-start'>
                  <h1 className='lg:text-2xl md:text-3xl md:w-[70%] sm:w-[80%] font-extrabold '>
                    {homes.title}
                  </h1>
                  <button className='likebtn'>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='md:text-[25px] '
                    />
                  </button>
                </div>

                <span className='flex justify-start items-center gap-2'>
                  <FontAwesomeIcon icon={faLocationDot} className='' />
                  <span className='text-sm font-medium'>{homes.address}</span>
                </span>

                <div className='flex lg:justify-between lg:items-center md:flex-row md:justify-between sm:flex-col sm:gap-4'>
                  <div className='flex justify-between items-center gap-5 flex-wrap'>
                    <span className='flex items-center gap-1 font-medium lg:text-base md:text-base sm:text-sm'>
                      <FontAwesomeIcon icon={faBuilding} color='grey' />
                      {homes.isNewProperty === true
                        ? 'Newly Built'
                        : 'Used Property'}
                    </span>
                    <span className='flex items-center gap-1 font-medium lg:text-base md:text-base sm:text-sm'>
                      <FontAwesomeIcon icon={faStar} color='grey' />
                      {homes.isPropertyForSale === true ? 'Sale' : 'Rent'}
                    </span>
                    <p className='font-medium flex items-center gap-2 lg:text-base md:text-base sm:text-sm'>
                      <FontAwesomeIcon icon={faBed} color='grey' />
                      {homes.bedrooms}
                    </p>
                    <p className='font-medium flex items-center gap-2 lg:text-base md:text-base sm:text-sm'>
                      <FontAwesomeIcon icon={faVectorSquare} color='grey' />
                      {homes.areaSpace}
                    </p>
                  </div>
                  <h1 className='lg:text-2xl md:text-xl sm:text-lg sm:ml-auto font-bold text-[#F30A49] '>
                    {homes.isPropertyForSale === true ? (
                      formattedPrice
                    ) : (
                      <>
                        {formattedPrice}
                        <span className='text-xs'>/per month</span>
                      </>
                    )}
                  </h1>
                </div>
              </div>
            </Link>
          )
        })
        .reverse()}
    </article>
  )
}

export default ListView
