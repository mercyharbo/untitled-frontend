import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setListingDetail, setLoading } from '@/slice/listingSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBed,
  faChevronLeft,
  faEnvelope,
  faPhone,
  faSink,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Head from 'next/head'

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
      const response = await fetch(`http://localhost:3000/api/listings/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      if (data.status === true) {
        dispatch(setListingDetail(data.listing))
        dispatch(setLoading(false))
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
    <>
      {' '}
      <Head>
        <title> {listingDetails.title} | XYZ Realty</title>
        <meta name='description' content={listingDetails.description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <button
        onClick={() => router.back()}
        className='flex justify-center items-center gap-2 bg-[#0C3C78] text-white p-2 px-5 rounded-md mx-10 mt-5 '
      >
        <FontAwesomeIcon icon={faChevronLeft} className='text-white ' />
        Go back
      </button>
      <main className='flex 2xl:p-10 lg:flex-row lg:justify-start lg:gap-5 lg:p-10 md:flex-col md:gap-5 md:p-10 sm:flex-col sm:gap-5 sm:p-5 '>
        <section className='xl:w-[70%] lg:w-[80%] lg:p-10 md:w-full sm:w-full sm:p-5 bg-white rounded-xl shadow-2xl '>
          <section className='flex flex-col gap-5 lg:p-5'>
            <div className='selected-image'>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt='Selected Image'
                  width={1000}
                  height={1000}
                  className='w-full object-cover rounded-lg 2xl:h-[600px] lg:h-[450px] '
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
                    className={`rounded-lg cursor-pointer object-cover lg:w-[100px] lg:h-[80px] md:w-[120px] sm:w-[110px]  ${
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
              <div className='flex flex-col gap-3'>
                <div className='flex lg:justify-between lg:items-start md:justify-between md:flex-row sm:flex-col sm:gap-5'>
                  <h1 className='2xl:text-4xl 2xl:w-[60%] lg:w-[70%] md:w-[50%] md:text-2xl sm:text-xl sm:w-full '>
                    {listingDetails.title}
                  </h1>
                  <span className='flex text-[#ef476f] font-bold lg:text-xl md:text-lg sm:text-lg '>
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

        <section className='bg-white shadow-2xl rounded-xl flex flex-col gap-5 2xl:p-10 2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:p-5 md:w-full sm:w-full sm:p-5   '>
          <header className='flex justify-start items-center gap-4'>
            <Image
              src={listingDetails.profilePic || '/img3.jpg'}
              alt='Selected Image'
              width={500}
              height={500}
              className='object-cover rounded-full border-black p-1 2xl:w-[70px] 2xl:h-[70px] lg:h-[100px] md:w-[100px] sm:h-[100px] sm:w-[100px] '
            />
            <div className='flex flex-col gap-1'>
              <h1 className='2xl:text-2xl lg:text-2xl md:text-xl sm:text-lg font-semibold '>
                {listingDetails?.firstname || 'Ridwan Damilare'}
              </h1>
              <span className='text-sm text-gray-400'>
                Joined in June 01, 2023
              </span>
            </div>
          </header>
          <p className='leading-[30px] text-base'>
            I&rsquo;m Ridwan Damilare, a real estate agent in San Diego.
            I&rsquo;ve been helping people buy and sell homes in the area for
            over 10 years, and I&rsquo;m passionate about helping people find
            the perfect home for their needs. I know that buying or selling a
            home is a big decision, and I&rsquo;m committed to providing my
          </p>
          <div className='flex flex-col gap-3'>
            <p className='flex items-center gap-2 font-medium'>
              Language:
              <span>English</span>
            </p>
            <p className='flex items-center gap-2 font-medium'>
              Response rate:
              <span>100%</span>
            </p>
            <p className='flex items-center gap-2 font-medium'>
              Response time
              <span>Within 1 hour</span>
            </p>
          </div>

          <div className='flex justify-between items-center'>
            <h3 className='font-semibold'>Contact with host:</h3>
            <div className='flex lg:flex-row lg:gap-2 md:gap-4 sm:gap-5'>
              <Link
                href={'mailto:testing123@gmail.com'}
                className='border-2 border-[#ef476f] h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email
              </Link>
              <Link
                href={'tel:090988888888'}
                className='border-2 border-[#ef476f] h-[40px] px-4 rounded-full flex justify-center items-center gap-2 '
              >
                <FontAwesomeIcon icon={faPhone} />
                Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default ListingDetail
