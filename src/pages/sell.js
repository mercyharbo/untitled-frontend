import { faStar } from '@fortawesome/free-regular-svg-icons'
import {
  faBed,
  faBuilding,
  faLocationDot,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setListings,
  setLoading,
  setTotal,
  setTotalPages,
} from '@/slice/listingSlice'
import usePagination from '@/hooks/usePagination'
import DashboardLayout from '@/components/DashboardLayout'

const ListingsForSell = () => {
  const listings = useSelector((state) => state.listings.listings)

  return (
    <DashboardLayout>
      <main className='p-5'>
        <h1 className='flex justify-start items-center gap-2 2xl:text-2xl xl:text-2xl lg:text-2xl'>
          Properties
          <span className='text-lg text-gray-500 font-semibold'>
            {
              listings?.filter((homes) => homes.isPropertyForSale === true)
                .length
            }{' '}
            Results
          </span>
        </h1>
        <article className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 lg:gap-5 md:grid-cols-2 sm:grid-cols-1 sm:gap-5'>
          {listings
            ?.filter((homes) => homes.isPropertyForSale === true)
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
                    className='rounded-lg object-cover w-full lg:h-[250px]  '
                  />
                  <div className='flex flex-col justify-between xl:gap-2 lg:gap-3 sm:gap-3'>
                    <span className='flex items-center gap-2 text-gray-500 sm:text-sm sm:pt-3 '>
                      Posted by
                      <p className='lowercase'>{homes?.user?.username || 'Not found'}</p>
                    </span>
                    <h1 className='w-full'>{homes.title}</h1>

                    <div className='flex lg:flex-col sm:flex-col gap-5'>
                      <span className='flex justify-start items-start gap-2'>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className='pt-1'
                        />
                        <span className='text-sm text-gray-500'>
                          {homes.address}
                        </span>
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
                          {homes.isPropertyForSale === true
                            ? 'Sale'
                            : 'ListingsForSell'}
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

                      <h1 className='sm:ml-auto text-[#ef476f]'>
                        {homes?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                      </h1>
                    </div>
                  </div>
                </Link>
              )
            })
            .reverse()}
        </article>
      </main>
    </DashboardLayout>
  )
}

export default ListingsForSell
