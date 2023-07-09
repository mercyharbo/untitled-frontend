import {
  faBed,
  faBuilding,
  faLocationDot,
  faStar,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const GridView = () => {
  const listings = useSelector((state) => state.listings.listings)
  const searchProperties = useSelector((state) => state.user.searchProperties)

  return (
    <article className='grid 3xl:grid-cols-4 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 lg:gap-5 md:grid-cols-2 sm:grid-cols-1 sm:gap-5'>
      {listings
        ?.filter((homes) =>
          homes.title?.toLowerCase().includes(searchProperties?.toLowerCase())
        )
        ?.map((homes) => {
          return (
            <Link
              key={homes._id}
              href={`/listings/${homes._id}`}
              className='flex flex-col bg-white shadow-2xl p-5 rounded-lg'
            >
              <Image
                src={homes?.images?.[0]}
                alt='homes'
                width={500}
                height={500}
                className='rounded-lg object-cover w-full lg:h-[250px] sm:h-[200px]  '
              />
              <div className='flex flex-col justify-between xl:gap-2 lg:gap-3 sm:gap-3'>
                <span className='flex items-center gap-1 text-[gray] sm:text-sm sm:pt-3 '>
                  Posted by
                  <p className='lowercase  '>
                    {homes?.user?.username || 'Not found'}
                  </p>
                </span>
                <h1 className='w-full'>{homes.title}</h1>

                <div className='flex lg:flex-col sm:flex-col gap-5'>
                  <span className='flex justify-start items-start gap-2'>
                    <FontAwesomeIcon icon={faLocationDot} className='pt-1' />
                    <span className='text-sm text-[gray]'>{homes.address}</span>
                  </span>

                  <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-1 font-medium text-sm'>
                      <FontAwesomeIcon icon={faBuilding} color='grey' />
                      {homes.isNewProperty === true
                        ? 'Newly Built'
                        : 'Used Property'}
                    </span>
                    <span className='flex items-center gap-1 font-medium text-sm'>
                      <FontAwesomeIcon icon={faStar} color='grey' />
                      {homes.isPropertyForSale === true ? 'Sale' : 'Rent'}
                    </span>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                      <FontAwesomeIcon icon={faBed} color='grey' />
                      {homes.bedrooms}
                    </p>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                      <FontAwesomeIcon icon={faVectorSquare} color='grey' />
                      {homes.areaSpace}
                    </p>
                  </div>

                  <span>
                    {homes.paymentOption === 'Monthly' && (
                      <div className=''>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        / Monthly
                      </div>
                    )}

                    {homes.paymentOption === 'Daily' && (
                      <div className=''>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        / Daily
                      </div>
                    )}

                    {homes.paymentOption === 'Annually' && (
                      <div className=''>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        / Annually
                      </div>
                    )}
                    {/* {homes.paymentOption === 'Monthly' ? (
                      <div className=''>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        / Monthly
                      </div>
                    ) : homes.paymentOption === 'Daily' ? (
                      <div className=''>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        / Daily
                      </div>
                    ) : homes.paymentOption === 'Annually' ? (
                      <div className=''>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        / Annually
                      </div>
                    ) : null} */}
                  </span>
                </div>
              </div>
            </Link>
          )
        })
        .reverse()}
    </article>
  )
}

export default GridView
