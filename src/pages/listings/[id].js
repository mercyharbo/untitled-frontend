import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setListingDetail, setLoading } from '@/slice/listingSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faChevronLeft,
  faEnvelope,
  faPhone,
  faSink,
  faTrash,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Head from 'next/head'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/DashboardLayout'

const ListingDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null)

  const listingDetails = useSelector((state) => state.listings.listingDetail)
  const loading = useSelector((state) => state.listings.loading)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const getListingDetails = async () => {
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
      } else {
        console.log('there is an error')
      }
    } catch (error) {}
  }

  const getEditListings = async () => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT}/api/listings/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()

      if (data.status === true) {
        dispatch(setListingDetail(data.listing))
        dispatch(setLoading(false))
      } else {
        console.log('there is an error')
      }
    } catch (error) {}
  }

  const deleteListing = async () => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT}/api/listings/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()

      if (data.status === true) {
        toast.success(data.message)
        router.push('/listings')
      } else {
        console.log('there is an error')
      }
    } catch (error) {}
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

  if (loading) {
    return <p className='text.3xl font-bold'>Loading...</p>
  }

  return (
    <DashboardLayout>
      <div className='flex justify-start items-center gap-2 flex-wrap 2xl:w-[50%] xl:w-[60%] xl:px-5 sm:p-5 '>
        <button
          type='button'
          onClick={() => router.back()}
          className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 mt-5  rounded-md  '
        >
          <FontAwesomeIcon icon={faChevronLeft} className='text-white ' />
          Go back
        </button>
        <button
          type='button'
          onClick={() => deleteListing()}
          className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 mt-5  rounded-md  '
        >
          <FontAwesomeIcon icon={faTrash} className='text-white ' />
          Delete
        </button>
        <button
          type='button'
          onClick={() => getEditListings()}
          className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 mt-5  rounded-md  '
        >
          <FontAwesomeIcon icon={faPenToSquare} className='text-white ' />
          Edit
        </button>
      </div>
      <main className='flex lg:flex-row lg:gap-5 md:flex-col md:gap-5 sm:flex-col sm:gap-5 sm:p-5'>
        <section className='xl:w-[70%] lg:w-[80%] md:w-full sm:w-full '>
          <section className='flex flex-col gap-5 lg:p-5'>
            <div className='selected-image'>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt='Selected Image'
                  width={1000}
                  height={1000}
                  className='w-full object-cover rounded-lg 2xl:h-[600px] lg:h-[450px] md:h-[300px] sm:h-[250px] '
                />
              )}
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
                        ? 'border-[3px] border-[#F30A49] p-1'
                        : ''
                    }`}
                    onClick={() => handleImageClick(thumbnail)}
                  />
                )
              })}
            </div>
            <article className='flex 2xl:gap-8 xl:gap-6 lg:flex-col lg:gap-4 md:flex-col md:gap-5 sm:flex-col sm:gap-5'>
              <div className='flex flex-col gap-3'>
                <div className='flex lg:justify-between lg:items-center md:justify-between md:flex-row sm:flex-col sm:gap-5'>
                  <h1 className='2xl:text-4xl 2xl:w-[60%] lg:w-[70%] md:w-[50%] md:text-2xl sm:text-xl sm:w-full '>
                    {listingDetails.title}
                  </h1>
                  <span className='flex text-[#F30A49] font-bold 2xl:text-xl xl:text-xl lg:text-xl md:text-lg sm:text-lg '>
                    Price:{' '}
                    {listingDetails?.price?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </span>
                </div>
                <p className='text-gray-400'>{listingDetails.address}</p>
              </div>
              <div className='flex lg:justify-between lg:items-center 2xl:w-[30%] lg:w-[40%] md:w-[40%] md:justify-between sm:w-full sm:justify-between '>
                <span className='flex flex-col justify-start items-start gap-2 font-semibold'>
                  Bathroom
                  <span className='flex items-center gap-2 font-normal'>
                    <FontAwesomeIcon icon={faSink} />
                    {listingDetails.bathroom}
                  </span>
                </span>
                <span className='flex flex-col justify-start items-start gap-2 font-semibold'>
                  Bedrooms
                  <span className='flex items-center gap-2 font-normal'>
                    <FontAwesomeIcon icon={faBed} />
                    {listingDetails.bedrooms}
                  </span>
                </span>
                <span className='flex flex-col justify-start items-start gap-2 font-semibold'>
                  Area Space
                  <div className='span flex items-center gap-2 font-normal'>
                    <FontAwesomeIcon icon={faVectorSquare} />
                    {listingDetails.areaSpace}
                  </div>
                </span>
              </div>

              <article className='flex flex-col gap-3'>
                <h1 className='lg:text-2xl md:text-xl sm:text-lg font-semibold '>
                  Description
                </h1>
                <p className=''>{listingDetails.description}</p>
              </article>

              <div className=''>
                <h3 className='font-semibold text-xl py-2'>Amenities</h3>
                {listingDetails?.amenities?.map((amenty, index) => {
                  return <li key={index}>{amenty}</li>
                })}
              </div>
            </article>
          </section>
        </section>

        <section className='flex flex-col gap-5 2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-full sm:w-full p-5  '>
          <header className='flex justify-start items-center gap-4'>
            <Image
              src={listingDetails?.user?.avatarUrl || '/img3.jpg'}
              alt='Selected Image'
              width={500}
              height={500}
              className='object-cover rounded-full border-2 border-[#F30A49] p-1 2xl:w-[70px] 2xl:h-[70px] lg:h-[100px] lg:w-[100px] md:w-[80px] 
              md:h-[80px] sm:h-[70px] sm:w-[70px] '
            />
            <div className='flex flex-col gap-1'>
              <h1 className='2xl:text-2xl lg:text-2xl md:text-xl sm:text-lg font-semibold '>
                {listingDetails?.user?.firstname}{' '}
                {listingDetails?.user?.lastname}
              </h1>
              <span className='text-sm text-gray-400'>
                Joined in June 01, 2023
              </span>
            </div>
          </header>
          <p className='leading-[30px] text-base'>
            {listingDetails?.user?.bio}
          </p>

          <div className='flex flex-col justify-start items-start gap-3'>
            <h3 className='font-semibold'>Contact with host:</h3>
            <div className='flex lg:flex-row lg:gap-2 md:gap-4 sm:gap-5'>
              <Link
                href={`mailto:${listingDetails.user.email}`}
                className='border-2 border-[#F30A49] h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email
              </Link>
              <Link
                href={`tel:${listingDetails?.user?.phoneNumber}`}
                className='border-2 border-[#F30A49] h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faPhone} />
                Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default ListingDetail
