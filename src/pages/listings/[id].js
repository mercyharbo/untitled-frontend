import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactStars from 'react-rating-stars-component'

import {
  faBed,
  faCheckDouble,
  faChevronLeft,
  faHeart,
  faShower,
  faTrash,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { faPenToSquare, faMessage } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'
import { Form, Formik, resetForm } from 'formik'

import DashboardLayout from '@/components/DashboardLayout'
import Spinner from '@/hooks/LoadingSpinner'
import Button from '@/hooks/button'
import {
  fetchListingDetails,
  setListingUpdateModal,
} from '@/slice/listingDetailSlice'
import { AddListingAsFavorite } from '@/slice/addFavorite'

import TextareaField from '@/hooks/Textarea'
import moment from 'moment/moment'
import InputField from '@/hooks/InputField'

const ListingDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ratings, setRatings] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const listingDetails = useSelector(
    (state) => state.listingDetail.listingDetail
  )
  const loading = useSelector((state) => state.listingDetail.loading)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const deleteListing = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()

      if (data.status === true) {
        toast.success('Your listing has been deleted successfully')
        router.push('/listings')
      } else {
        console.log('there is an error')
      }
    } catch (error) {}
  }

  const RateListing = async (values) => {
    const token = localStorage.getItem('token')
 
    const ratingsData = {
      rating: ratings,
      ...values,
    }
    // console.log(ratingsData, 'values...')
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings/${id}/rate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ratingsData),
        }
      )
      const data = await response.json()

      if (data.status === true) {
        toast.success(data.message)
        setIsLoading(false)
        router.reload()
      } else {
        toast.error(data.error)
        setIsLoading(false)
      }
    } catch (error) {}
  }

  const markAsSold = async () => {
    // const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings/${id}/sold`,
        {
          method: 'PUT',
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()

      if (data.status === true) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
    } catch (error) {}
  }

  // adding listing as favorites to the favorite array
  const AddFavorites = async (event, listing_id) => {
    event.stopPropagation()
    event.preventDefault()
    try {
      await dispatch(AddListingAsFavorite(listing_id))
    } catch (error) {}
  }

  // fetching the listing details
  useEffect(() => {
    dispatch(fetchListingDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (listingDetails?.images?.length > 0) {
      setSelectedImage(listingDetails.images[0])
    }
  }, [listingDetails])

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUserId(userId)
  }, [])

  return (
    <DashboardLayout>
      {loading ? (
        <div className='flex justify-center items-center h-screen m-auto'>
          <Spinner />
        </div>
      ) : (
        <div>
          <div className='flex justify-start items-center gap-2 flex-wrap 2xl:w-[50%] xl:w-[60%] xl:pl-10 md:pl-5 sm:pl-5 '>
            <button
              type='button'
              onClick={() => router.back()}
              className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 mt-5  rounded-md  '
            >
              <FontAwesomeIcon icon={faChevronLeft} className='text-white ' />
              back
            </button>
            {listingDetails.user?._id === userId && (
              <button
                type='button'
                onClick={() => deleteListing()}
                className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 mt-5  rounded-md  '
              >
                <FontAwesomeIcon icon={faTrash} className='text-white ' />
                Delete
              </button>
            )}
            {listingDetails.user?._id === userId && (
              <button
                type='button'
                onClick={() => dispatch(setListingUpdateModal(true))}
                className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 mt-5  rounded-md  '
              >
                <FontAwesomeIcon icon={faPenToSquare} className='text-white ' />
                Edit
              </button>
            )}
          </div>
          <main className='flex lg:flex-row lg:gap-5 md:flex-col md:gap-5 sm:flex-col sm:gap-5 sm:p-5'>
            <section className='xl:w-[70%] lg:w-[80%] md:w-full sm:w-full '>
              <section className='flex flex-col gap-5 lg:p-5'>
                <div className='relative'>
                  {selectedImage && (
                    <Image
                      src={selectedImage}
                      alt='Selected Image'
                      width={1000}
                      height={1000}
                      className='w-full object-cover rounded-lg 2xl:h-[600px] lg:h-[450px] md:h-[400px] sm:h-[270px] '
                    />
                  )}
                  <span className='absolute top-5 left-0 h-[40px] w-[130px] bg-color3 text-white p-2 '>
                    {listingDetails.propertyType}
                  </span>
                  <Button
                    type='button'
                    label={
                      listingDetails.favorites ? (
                        <FontAwesomeIcon
                          icon={faHeart}
                          className='text-xl text-red'
                        />
                      ) : (
                        <FontAwesomeIcon icon={faHeart} className='text-xl ' />
                      )
                    }
                    onClick={(event) => AddFavorites(event, listingDetails._id)}
                    className={`w-[50px] h-[50px] shadow-2xl rounded-full flex justify-center items-center absolute right-8 top-5 hover:bg-hover ${
                      listingDetails.favorites
                        ? 'bg-[#ffffffc4] shadow-2xl '
                        : 'bg-[#0b0101c3] shadow-2xl'
                    }`}
                  />
                </div>
                <div className='flex overflow-x-auto xl:flex-row lg:flex-row lg:justify-start lg:items-start lg:gap-5 md:gap-5 sm:gap-5'>
                  {listingDetails?.images?.map((thumbnail, index) => {
                    return (
                      <Image
                        key={index}
                        src={thumbnail}
                        alt='thumbnail'
                        width={200}
                        height={200}
                        className={`rounded-lg cursor-pointer object-cover lg:w-[80px] lg:h-[80px] md:w-[80px] md:h-[80px] sm:w-[80px] sm:h-[80px]  ${
                          selectedImage === thumbnail
                            ? 'border-[3px] border-black p-1'
                            : ''
                        }`}
                        onClick={() => handleImageClick(thumbnail)}
                      />
                    )
                  })}
                </div>
                <article className='flex 2xl:gap-8 xl:gap-6 lg:flex-col lg:gap-4 md:flex-col md:gap-5 sm:flex-col sm:gap-5'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex lg:justify-between lg:items-start md:justify-between md:flex-row sm:flex-col sm:gap-5'>
                      <h1 className='2xl:text-4xl 2xl:w-[60%] lg:w-[70%] md:w-[50%] md:text-2xl sm:text-xl sm:w-full capitalize '>
                        {listingDetails.title}
                      </h1>
                      <div className='3xl:w-[20rem] 2xl:w-[15rem] xl:w-[15rem] md:w-[15rem] sm:w-full '>
                        {listingDetails.isPropertyForSale === true ? (
                          <span className=' text-black font-semibold text-xl '>
                            {listingDetails?.price?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'NGN',
                            })}
                          </span>
                        ) : (
                          <span className=' text-black font-semibold text-xl '>
                            {listingDetails?.price?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'NGN',
                            })}
                            <span className='text-[gray] text-sm font-normal '>
                              /{listingDetails.paymentOption}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                    <p className='text-[gray] text-sm '>
                      {listingDetails.address}
                    </p>
                  </div>

                  <div className='xl:p-4 sm:p-3 flex justify-between items-center bg-[#faf5f541] shadow-lg rounded-md'>
                    <header className=' flex justify-start items-center gap-4 flex-wrap'>
                      <Image
                        src={listingDetails?.user?.avatarUrl || '/img3.jpg'}
                        alt='Selected Image'
                        width={500}
                        height={500}
                        className='object-cover rounded-full border-2 border-black p-1 w-[70px] h-[70px] '
                      />
                      <div className='flex flex-col'>
                        <Link
                          href={`/users/${listingDetails?.user?._id}`}
                          className='text-xl font-medium '
                        >
                          {listingDetails?.user?.firstname}{' '}
                        </Link>
                        <span className='text-sm text-[gray] '>
                          Realtor Agent
                        </span>
                      </div>
                    </header>

                    <Link href={`/message`}>
                      <FontAwesomeIcon icon={faMessage} className='text-2xl' />
                    </Link>
                  </div>
                  <div className='flex flex-wrap gap-5 xl:justify-between xl:items-center md:justify-between md:items-center'>
                    <div className='flex lg:justify-between lg:items-center 2xl:w-[40%] lg:w-[40%] md:w-[40%] md:justify-between sm:w-full sm:justify-between '>
                      <span className='flex flex-col justify-start items-start gap-2 font-medium'>
                        Bathroom
                        <span className='flex items-center gap-2 font-normal'>
                          <FontAwesomeIcon icon={faShower} />
                          {listingDetails.bathroom}
                        </span>
                      </span>
                      <span className='flex flex-col justify-start items-start gap-2 font-medium'>
                        Bedrooms
                        <span className='flex items-center gap-2 font-normal'>
                          <FontAwesomeIcon icon={faBed} />
                          {listingDetails.bedrooms}
                        </span>
                      </span>
                      <span className='flex flex-col justify-start items-start gap-2 font-medium'>
                        Area Space
                        <div className='span flex items-center gap-2 font-normal'>
                          <FontAwesomeIcon icon={faVectorSquare} />
                          {listingDetails.areaSpace}
                        </div>
                      </span>
                    </div>

                    {listingDetails.user?._id === userId && (
                      <Button
                        label='Mark as sold'
                        type='button'
                        icons={<FontAwesomeIcon icon={faCheckDouble} />}
                        onClick={() => markAsSold()}
                        className='rounded-md flex justify-center items-center gap-2 h-[50px] '
                      />
                    )}
                  </div>

                  <article className='flex flex-col gap-3'>
                    <h1>Description</h1>
                    <p className=''>{listingDetails.description}</p>
                  </article>

                  <div className='flex flex-col gap-3'>
                    <h3>Amenities</h3>
                    <div className='flex flex-wrap gap-4 justify-start items-center'>
                      {listingDetails?.amenities?.map((amenty, index) => {
                        return (
                          <span
                            key={index}
                            className='bg-color3 py-2 px-5 rounded-full text-white '
                          >
                            {amenty}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h1>User reviews</h1>
                    <div className='flex flex-col gap-3 py-5'>
                      {listingDetails?.ratings
                        ?.slice(0, 5)
                        ?.map((userRatings) => {
                          return (
                            <article
                              key={userRatings._id}
                              className='bg-color2 p-2 rounded-md shadow-md'
                            >
                              <ReactStars
                                count={5}
                                size={20}
                                value={userRatings.rating}
                                activeColor='#ffd700'
                              />
                              <h1>{userRatings.name}</h1>
                              <p>{userRatings.comment}</p>
                              <span className='text-sm text-[gray] '>
                                {moment(userRatings.createdAt).format('LLL')}
                              </span>
                            </article>
                          )
                        })}
                    </div>
                  </div>
                  <hr />
                  <div className=''>
                    <h1>Leave a review</h1>
                    <Formik
                      initialValues={{ comment: '', name: '' }}
                      onSubmit={(values) => {
                        RateListing(values)
                      }}
                    >
                      <Form>
                        <ReactStars
                          count={5}
                          size={50}
                          value={ratings}
                          onChange={(newRating) => setRatings(newRating)}
                          activeColor='#ffd700'
                        />

                        <div className='flex flex-col gap-2'>
                          <label htmlFor='name'>Your name:</label>
                          <InputField
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Enter your name'
                            className='w-full'
                          />
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label htmlFor='comment'>Comment:</label>
                          <TextareaField
                            name='comment'
                            id='comment'
                            rows={15}
                            cols={80}
                            placeholder='Leave a comment'
                            className='w-full'
                          />
                        </div>
                        <Button
                          label={isLoading ? 'Submiting...' : 'Submit Review'}
                          name='submit'
                          type='submit'
                          className='h-[50px] rounded-md my-5 '
                        />
                      </Form>
                    </Formik>
                  </div>
                </article>
              </section>
            </section>

            {/* <section className='flex flex-col gap-5 2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-full sm:w-full  '>
              <p className='leading-[30px] text-sm'>
                {listingDetails?.user?.bio}
              </p>
            </section> */}
          </main>
        </div>
      )}
    </DashboardLayout>
  )
}

export default ListingDetail
