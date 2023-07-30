import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faLocationDot,
  faMessage,
  faPhone,
  faShower,
  faStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-regular-svg-icons'

import DashboardLayout from '@/components/DashboardLayout'
import { getUser } from '@/slice/userProfile'
import Spinner from '@/hooks/LoadingSpinner'
import { getFavorites } from '@/slice/favoriteSlice'
import Button from '@/hooks/button'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const [profileTab, setProfileTab] = useState('listings')

  const user = useSelector((state) => state.userProfileDetails.user)
  const loading = useSelector((state) => state.userProfileDetails.loading)
  const listings = useSelector((state) => state.userProfileDetails.userListing)

  const soldListings = useSelector(
    (state) => state.userProfileDetails.soldListing
  )
  const favorite = useSelector((state) => state.userProfileDetails.favorites)

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getFavorites())
  }, [dispatch])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen m-auto'>
        <Spinner />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col gap-5 justify-center w-full'>
        <header className='flex flex-col justify-center items-center gap-5 mx-auto'>
          <div className='flex justify-start 2xl:items-center xl:items-center lg:items-center md:items-start sm:items-start gap-4 lg:flex-row md:flex-row sm:flex-col'>
            <Image
              src={user?.avatarUrl || 'https://via.placeholder.com/500'}
              alt='Profile Picture'
              width={500}
              height={500}
              className='rounded-full p-[2px] bg-color3 object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[80px] xl:h-[80px] md:w-[120px] md:h-[120px] 
              sm:w-[120px] sm:h-[120px] '
            />
          </div>

          <div className='flex flex-col justify-center items-center gap-4 w-full'>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <h1 className='2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-center '>
                {user?.firstname} {user?.lastname}
              </h1>
              <div className='flex gap-3 divide-x-2'>
                <span className='text-sm text-[gray]'>@{user.username}</span>
                <span className='text-sm text-[gray] flex items-center gap-1 px-3'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {user.address}
                </span>
              </div>
            </div>
            <p className='2xl:w-[60%] text-center text-base '>{user?.bio}</p>
          </div>

          <div className='flex justify-center items-center gap-3 divide-x divide-[gray] '>
            <Link
              href={`tel:${user.phoneNumber}`}
              className='flex gap-2 justify-center items-center '
            >
              <FontAwesomeIcon icon={faPhone} />
              Call
            </Link>
            <button
              type='button'
              className='flex gap-2 justify-center items-center pl-4 '
            >
              <FontAwesomeIcon icon={faMessage} />
              Message
            </button>
            <button
              type='button'
              className='flex gap-2 justify-center items-center pl-4 '
            >
              <FontAwesomeIcon icon={faStar} />
              Rate this user
            </button>
          </div>
        </header>

        <div className='flex justify-center items-center gap-4 mx-auto w-full '>
          <div className='border border-[#F5F4F8] flex flex-col justify-center items-center gap-1 py-4 px-5 rounded-xl w-[150px] h-[65px] '>
            <span className='font-medium'>{listings?.length}</span>
            Listings
          </div>
          <div className='border border-[#F5F4F8] flex flex-col justify-center items-center gap-1 py-4 px-5 rounded-xl w-[150px] h-[65px] '>
            <span className='font-medium'>{soldListings?.length}</span>
            Sold{' '}
          </div>
          <div className='border border-[#F5F4F8] flex flex-col justify-center items-center gap-1 py-4 px-5 rounded-xl w-[150px] h-[65px] '>
            <span className='font-medium'>{favorite?.length}</span>
            Favorites{' '}
          </div>
        </div>

        <div className='xl:w-[30%] md:w-full sm:w-full grid grid-cols-3 content-center place-content-center gap-5 mx-auto bg-[#F5F4F8] h-[55px] rounded-full px-2  '>
          <button
            type='button'
            onClick={() => setProfileTab('listings')}
            className={`${
              profileTab === 'listings'
                ? 'bg-white rounded-full py-2 px-5 w-full'
                : ''
            }`}
          >
            Listings
          </button>
          <button
            type='button'
            onClick={() => setProfileTab('sold')}
            className={`${
              profileTab === 'sold'
                ? 'bg-white rounded-full py-2 px-5 w-full'
                : ''
            }`}
          >
            Sold
          </button>
          <button
            type='button'
            onClick={() => setProfileTab('favorite')}
            className={`${
              profileTab === 'favorite'
                ? 'bg-white rounded-full py-2 px-5 w-full'
                : ''
            }`}
          >
            Favorite
          </button>
        </div>

        {profileTab === 'sold' && (
          <section className='grid p-5 3xl:grid-cols-4 2xl:grid-cols-3 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
            {soldListings?.map((aptListing) => {
              return (
                <Link
                  key={aptListing._id}
                  href={`/listings/${aptListing._id}`}
                  className='flex flex-col gap-3 bg-white shadow-2xl p-4 rounded-lg'
                >
                  <Image
                    src={aptListing?.images?.[0]}
                    alt='image'
                    width={500}
                    height={500}
                    className='rounded-lg object-cover w-full lg:h-[250px] sm:h-[200px] '
                  />
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-xl '>{aptListing.title}</h1>
                    <span className='text-[12px] text-[gray] flex justify-start items-center gap-2 '>
                      <FontAwesomeIcon icon={faLocationDot} />
                      {aptListing.address}
                    </span>
                    <p className='flex items-center gap-2 text-sm font-medium'>
                      Property Type:{' '}
                      <span className=''>{aptListing.propertyType}</span>
                    </p>
                  </div>

                  <div className='flex justify-between items-center flex-wrap w-full'>
                    <span className='flex items-center gap-1 font-medium text-sm'>
                      <FontAwesomeIcon icon={faBuilding} color='grey' />
                      {aptListing.isNewProperty === true
                        ? 'Newly Built'
                        : 'Used Property'}
                    </span>
                    <span className='flex items-center gap-1 font-medium text-sm'>
                      <FontAwesomeIcon icon={faStar} color='grey' />
                      {aptListing.isPropertyForSale === true
                        ? 'Selling'
                        : 'Renting'}
                    </span>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                      <FontAwesomeIcon icon={faBed} color='grey' />
                      {aptListing.bedrooms}
                    </p>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                      <FontAwesomeIcon icon={faShower} color='grey' />
                      {aptListing.bathroom}
                    </p>
                  </div>

                  <span>
                    {aptListing.isPropertyForSale === true ? (
                      <div className='font-medium'>
                        {aptListing?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                      </div>
                    ) : (
                      <div className='font-medium'>
                        {aptListing?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        <span className='text-[gray] text-sm font-normal '>
                          /{aptListing.paymentOption}
                        </span>
                      </div>
                    )}
                  </span>
                </Link>
              )
            })}
          </section>
        )}

        {profileTab === 'listings' && (
          <section className='grid p-5 3xl:grid-cols-4 2xl:grid-cols-3 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
            {listings?.map((aptListing) => {
              return (
                <Link
                  key={aptListing._id}
                  href={`/listings/${aptListing._id}`}
                  className='flex flex-col gap-3 bg-white shadow-2xl p-4 rounded-lg'
                >
                  <Image
                    src={aptListing?.images?.[0]}
                    alt='image'
                    width={500}
                    height={500}
                    className='rounded-lg object-cover w-full lg:h-[250px] sm:h-[200px] '
                  />
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-xl '>{aptListing.title}</h1>
                    <span className='text-[12px] text-[gray] flex justify-start items-center gap-2 '>
                      <FontAwesomeIcon icon={faLocationDot} />
                      {aptListing.address}
                    </span>
                    <p className='flex items-center gap-2 text-sm font-medium'>
                      Property Type:{' '}
                      <span className=''>{aptListing.propertyType}</span>
                    </p>
                  </div>

                  <div className='flex justify-between items-center flex-wrap w-full'>
                    <span className='flex items-center gap-1 font-medium text-sm'>
                      <FontAwesomeIcon icon={faBuilding} color='grey' />
                      {aptListing.isNewProperty === true
                        ? 'Newly Built'
                        : 'Used Property'}
                    </span>
                    <span className='flex items-center gap-1 font-medium text-sm'>
                      <FontAwesomeIcon icon={faStar} color='grey' />
                      {aptListing.isPropertyForSale === true
                        ? 'Selling'
                        : 'Renting'}
                    </span>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                      <FontAwesomeIcon icon={faBed} color='grey' />
                      {aptListing.bedrooms}
                    </p>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                      <FontAwesomeIcon icon={faShower} color='grey' />
                      {aptListing.bathroom}
                    </p>
                  </div>

                  <span>
                    {aptListing.isPropertyForSale === true ? (
                      <div className='font-medium'>
                        {aptListing?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                      </div>
                    ) : (
                      <div className='font-medium'>
                        {aptListing?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        <span className='text-[gray] text-sm font-normal '>
                          /{aptListing.paymentOption}
                        </span>
                      </div>
                    )}
                  </span>
                </Link>
              )
            })}
          </section>
        )}

        {profileTab === 'favorite' && (
          <section className='grid 3xl:grid-cols-4 2xl:grid-cols-3 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
            {favorite?.map((listing) => {
              return (
                <Link
                  key={listing._id}
                  href={`/listings/${listing._id}`}
                  className='flex flex-col gap-3 bg-white shadow-2xl p-4 rounded-lg relative'
                >
                  <Image
                    src={listing?.images?.[0]}
                    alt='image'
                    width={500}
                    height={500}
                    className='rounded-lg object-cover 3xl:h-[250px] 2xl:h-[250px] xl:h-[250px] md:h-[250px] sm:h-[200px] '
                  />
                  <Button
                    type='button'
                    label={
                      listing.favorites ? (
                        <FontAwesomeIcon
                          icon={faHeart}
                          className='text-xl text-red'
                        />
                      ) : (
                        <FontAwesomeIcon icon={faHeart} className='text-xl ' />
                      )
                    }
                    className={`w-[50px] h-[50px] shadow-2xl rounded-full flex justify-center items-center absolute right-6 top-5 hover:bg-hover ${
                      listing.favorites
                        ? 'bg-[#ffffffc4] shadow-2xl '
                        : 'bg-[#0b0101c3] shadow-2xl'
                    }`}
                  />
                  <div className='h-full flex flex-col justify-between items-start gap-4'>
                    <div className='flex flex-col gap-2'>
                      <h1 className='2xl:text-lg '>{listing.title}</h1>
                      <span className='text-[12px] text-[gray] flex justify-start items-center gap-2 '>
                        <FontAwesomeIcon icon={faLocationDot} />
                        {listing.address}
                      </span>
                    </div>

                    <div className='flex justify-between items-center flex-wrap w-full'>
                      <span className='flex items-center gap-1 font-medium text-sm'>
                        <FontAwesomeIcon icon={faBuilding} color='grey' />
                        {listing.isNewProperty === true
                          ? 'Newly Built'
                          : 'Used Property'}
                      </span>
                      <span className='flex items-center gap-1 font-medium text-sm'>
                        <FontAwesomeIcon icon={faStar} color='grey' />
                        {listing.isPropertyForSale === true
                          ? 'Selling'
                          : 'Renting'}
                      </span>
                      <p className='font-medium flex items-center gap-2 text-sm'>
                        <FontAwesomeIcon icon={faBed} color='grey' />
                        {listing.bedrooms}
                      </p>
                      <p className='font-medium flex items-center gap-2 text-sm'>
                        <FontAwesomeIcon icon={faShower} color='grey' />
                        {listing.bathroom}
                      </p>
                    </div>
                  </div>
                  <span>
                    {listing.isPropertyForSale === true ? (
                      <div className='font-medium'>
                        {listing?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                      </div>
                    ) : (
                      <div className='font-medium'>
                        {listing?.price?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        })}
                        <span className='text-[gray] text-sm font-normal '>
                          /{listing.paymentOption}
                        </span>
                      </div>
                    )}
                  </span>
                </Link>
              )
            })}
          </section>
        )}
      </main>
    </DashboardLayout>
  )
}

export default User
