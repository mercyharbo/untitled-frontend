import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faBuilding,
  faLocationDot,
  faShower,
  faStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'

import HeaderFilter from '@/components/ListingsHeader'
import DashboardLayout from '@/components/DashboardLayout'
import Spinner from '@/hooks/LoadingSpinner'
import Button from '@/hooks/button'
import { fetchListings } from '@/slice/listingSlice'
import EmptyState from '@/components/emptyState'
import { AddListingAsFavorite } from '@/slice/addFavorite'

export default function Home() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('All Listings')

  const loading = useSelector((state) => state.listings.loading)
  const listings = useSelector((state) => state.listings.listings)
  const filteredListing = useSelector((state) => state.listings.filteredListing)
  const searchListing = useSelector((state) => state.search.searchListing)

  const AddFavorites = async (event, listing_id) => {
    event.stopPropagation()
    event.preventDefault()
    try {
      await dispatch(AddListingAsFavorite(listing_id))
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(fetchListings(1))
  }, [dispatch])

  return (
    <DashboardLayout>
      {loading ? (
        <div className='flex justify-center items-center h-screen m-auto'>
          <Spinner />
        </div>
      ) : (
        <main className='flex flex-col p-5 w-full'>
          <HeaderFilter setActiveTab={setActiveTab} activeTab={activeTab} />

          {listings.length > 1 ? (
            <article className='grid 3xl:grid-cols-4 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 lg:gap-5 md:grid-cols-2 sm:grid-cols-1 sm:gap-5'>
              {filteredListing
                ?.filter((homes) =>
                  homes.title
                    ?.toLowerCase()
                    .includes(searchListing?.toLowerCase())
                )
                ?.map((homes) => {
                  return (
                    <Link
                      key={homes._id}
                      href={`/listings/${homes._id}`}
                      className='flex flex-col bg-white shadow-2xl p-5 rounded-lg relative'
                    >
                      <Image
                        src={homes?.images?.[0]}
                        alt='homes'
                        width={500}
                        height={500}
                        className='rounded-lg object-cover w-full lg:h-[250px] sm:h-[200px]  '
                      />
                      <Button
                        type='button'
                        label={
                          homes.favorites ? (
                            <FontAwesomeIcon
                              icon={faHeart}
                              className='text-xl text-red'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faHeart}
                              className='text-xl '
                            />
                          )
                        }
                        onClick={(event) => AddFavorites(event, homes._id)}
                        className={`w-[50px] h-[50px] shadow-2xl rounded-full flex justify-center items-center absolute right-8 top-8 hover:bg-hover ${
                          homes.favorites
                            ? 'bg-[#ffffffc4] shadow-2xl '
                            : 'bg-[#0b0101c3] shadow-2xl'
                        }`}
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
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className='pt-1'
                            />
                            <span className='text-sm text-[gray]'>
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
                                : 'Rent'}
                            </span>
                            <p className='font-medium flex items-center gap-2 text-sm'>
                              <FontAwesomeIcon icon={faBed} color='grey' />
                              {homes.bedrooms}
                            </p>
                            <p className='font-medium flex items-center gap-2 text-sm'>
                              <FontAwesomeIcon icon={faShower} color='grey' />
                              {homes.bathroom}
                            </p>
                          </div>

                          <span>
                            {homes.isPropertyForSale === true ? (
                              <div className='font-semibold'>
                                {homes?.price?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'NGN',
                                })}
                              </div>
                            ) : (
                              <div className='font-semibold'>
                                {homes?.price?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'NGN',
                                })}
                                <span className='text-[gray] text-sm font-normal '>
                                  /{homes.paymentOption}
                                </span>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })
                .reverse()}
            </article>
          ) : (
            <EmptyState />
          )}
        </main>
      )}
    </DashboardLayout>
  )
}
