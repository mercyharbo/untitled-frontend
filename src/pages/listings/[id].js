import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setListingDetail, setLoading, setModal } from '@/slice/listingSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faCheckDouble,
  faChevronLeft,
  faEnvelope,
  faHeart,
  faPhone,
  faShower,
  faTrash,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { faMessage, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'

import DashboardLayout from '@/components/DashboardLayout'
import Spinner from '@/hooks/LoadingSpinner'
import Button from '@/hooks/button'

const ListingDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null)
  const [userId, setUserId] = useState(null)

  const listingDetails = useSelector((state) => state.listings.listingDetail)
  const loading = useSelector((state) => state.listings.loading)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const getListingDetails = async () => {
    dispatch(setLoading(true))
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()

      if (data.status === true) {
        dispatch(setListingDetail(data.listing))
        dispatch(setLoading(false))
        dispatch(setLoading(false))
      } else {
        console.log('there is an error')
      }
    } catch (error) {}
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

  const AddFavorites = async (event, listing_id) => {
    event.stopPropagation()
    event.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_DEV}/api/favorites/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ listingId: listing_id }),
        }
      )
      const data = await response.json()

      if (data.status === true) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      getListingDetails()
    }
  }, [id])

  useEffect(() => {
    if (listingDetails?.images?.length > 0) {
      setSelectedImage(listingDetails.images[0])
    }
  }, [listingDetails])

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUserId(userId)
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen m-auto'>
        <Spinner />
      </div>
    )
  }

  return (
    <DashboardLayout>
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
            onClick={() => dispatch(setModal(true))}
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
                        <span className='text-[gray] text-sm '>
                          /{listingDetails.paymentOption}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <p className='text-[gray] '>{listingDetails.address}</p>
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
                <h1 className='text-xl font-medium '>Description</h1>
                <p className=''>{listingDetails.description}</p>
              </article>

              <div className=''>
                <h3 className='font-medium text-xl py-2'>Amenities</h3>
                {listingDetails?.amenities?.map((amenty, index) => {
                  return <li key={index}>{amenty}</li>
                })}
              </div>
            </article>
          </section>
        </section>

        <section className='flex flex-col gap-5 2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-full sm:w-full  '>
          <header className='flex justify-start items-center gap-4 flex-wrap'>
            <Image
              src={listingDetails?.user?.avatarUrl || '/img3.jpg'}
              alt='Selected Image'
              width={500}
              height={500}
              className='object-cover rounded-full border-2 border-black p-1 2xl:w-[60px] 2xl:h-[60px] lg:h-[100px] lg:w-[100px] md:w-[80px] 
              md:h-[80px] sm:h-[60px] sm:w-[60px] '
            />
            <div className='flex flex-col gap-1'>
              <h1 className='2xl:text-2xl lg:text-2xl md:text-xl sm:text-lg font-medium '>
                {listingDetails?.user?.firstname}{' '}
                {listingDetails?.user?.lastname}
              </h1>
              <span className='text-sm text-gray-400'>
                Joined in June 01, 2023
              </span>
            </div>
          </header>
          <p className='leading-[30px] text-sm'>{listingDetails?.user?.bio}</p>

          <div className='flex flex-col justify-start items-start gap-3'>
            <h3 className='font-medium'>Contact with host:</h3>
            <div className='flex lg:flex-row lg:gap-2 md:gap-4 sm:gap-5'>
              <Link
                href={`mailto:${listingDetails?.user?.email}`}
                className='border-2 border-black h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email
              </Link>
              <Link
                href={`tel:${listingDetails?.user?.phoneNumber}`}
                className='border-2 border-black h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faPhone} />
                Call
              </Link>
              <Link
                href={`tel:${listingDetails?.user?.phoneNumber}`}
                className='border-2 border-black h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faMessage} />
                Message
              </Link>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default ListingDetail
