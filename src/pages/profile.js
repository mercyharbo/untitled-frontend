import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DashboardLayout from '@/components/DashboardLayout'
import { getProfile } from '@/slice/userSlice'

import 'react-toastify/dist/ReactToastify.css'
import Button from '@/hooks/button'
import Spinner from '@/hooks/LoadingSpinner'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faLocationDot,
  faShower,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { faBuilding, faStar } from '@fortawesome/free-regular-svg-icons'
import { setProfileModal } from '@/slice/updateProfileSlice'
import { getFavorites } from '@/slice/favoriteSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const [profileTab, setProfileTab] = useState('listings')

  const userProfile = useSelector((state) => state.user.userProfile)
  const loading = useSelector((state) => state.user.loading)
  const favorite = useSelector((state) => state.favorite.favListing)

  useEffect(() => {
    dispatch(getFavorites())
  }, [dispatch])

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    dispatch(getProfile(userId))
  }, [dispatch])

  return (
    <DashboardLayout>
      {loading ? (
        <div className='flex justify-center items-center h-screen m-auto'>
          <Spinner />
        </div>
      ) : (
        <main className='flex flex-col justify-start items-start gap-4 mx-auto relative md:px-8 md:py-8 sm:px-5 sm:py-8 '>
          <header className='flex flex-col justify-center items-center gap-5 mx-auto'>
            <div className='flex justify-start 2xl:items-center xl:items-center lg:items-center md:items-start sm:items-start gap-4 lg:flex-row md:flex-row sm:flex-col'>
              <Image
                src={
                  userProfile?.avatarUrl || 'https://via.placeholder.com/500'
                }
                alt='Profile Picture'
                width={500}
                height={500}
                className='rounded-full p-[2px] bg-color3 object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[80px] xl:h-[80px] md:w-[120px] md:h-[120px] 
              sm:w-[120px] sm:h-[120px] '
              />
            </div>

            <div className='flex flex-col justify-center items-center gap-2 w-full'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <h1 className='2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-center '>
                  {userProfile?.firstname} {userProfile?.lastname}
                </h1>
                <span className='text-base text-[gray] font-medium'>
                  @{userProfile?.username}
                </span>
              </div>
              <p className='2xl:w-[60%] xl:w-[60%] md:w-full sm:w-full text-center text-base '>
                {userProfile?.bio}
              </p>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <Button
                type='button'
                label='Share'
                className='px-5 rounded-full bg-color3 h-[50px] '
              />

              <Button
                type='button'
                label='Edit profile'
                onClick={() => dispatch(setProfileModal(true))}
                className='px-5 rounded-full h-[50px] '
              />
            </div>
          </header>

          <div className='flex justify-center items-center gap-5 w-full py-4 font-semibold'>
            <button
              type='button'
              onClick={() => setProfileTab('listings')}
              className={`${
                profileTab === 'listings' ? 'border-b-[3px] border-color3' : ''
              }`}
            >
              Listings
            </button>
            <button
              type='button'
              onClick={() => setProfileTab('sold')}
              className={`${
                profileTab === 'sold' ? 'border-b-[2px] border-black' : ''
              }`}
            >
              Sold
            </button>
            <button
              type='button'
              onClick={() => setProfileTab('favorite')}
              className={`${
                profileTab === 'favorite' ? 'border-b-[2px] border-black' : ''
              }`}
            >
              Favorite
            </button>
          </div>

          {profileTab === 'sold' && (
            <section className='grid 3xl:grid-cols-4 2xl:grid-cols-3 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
              {userProfile?.soldListings?.map((listing) => {
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
                          <FontAwesomeIcon
                            icon={faHeart}
                            className='text-xl '
                          />
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
                        <div className='font-semibold'>
                          {listing?.price?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                          })}
                        </div>
                      ) : (
                        <div className='font-semibold'>
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

          {profileTab === 'listings' && (
            <section className='grid 3xl:grid-cols-4 2xl:grid-cols-3 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
              {userProfile?.listings?.map((listing) => {
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
                          <FontAwesomeIcon
                            icon={faHeart}
                            className='text-xl '
                          />
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
                        <div className='font-semibold'>
                          {listing?.price?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                          })}
                        </div>
                      ) : (
                        <div className='font-semibold'>
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

          {profileTab === 'favorite' &&
            (favorite.length > 0 ? (
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
                            <FontAwesomeIcon
                              icon={faHeart}
                              className='text-xl '
                            />
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
                          <div className='font-semibold'>
                            {listing?.price?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'NGN',
                            })}
                          </div>
                        ) : (
                          <div className='font-semibold'>
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
            ) : (
              <article className='m-autp flex flex-col justify-center items-center p-5'>
                <h1 className='text-2xl'>Your favorite tab is empty</h1>
                <p>You can add a listing as favorite and check back again.</p>
              </article>
            ))}
        </main>
      )}
    </DashboardLayout>
  )
}

export default Profile
