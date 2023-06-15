import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='2xl:pb-14'>
      <section
        className='relative flex bg-[#090030] text-white rounded-lg shadow-2xl 2xl:m-10 2xl:grid-cols-2 xl:place-items-center xl:grid-cols-2 
      xl:m-10 xl:p-0 lg:grid-cols-2 md:flex-row sm:flex-col-reverse sm:m-5'
      >
        <section className='flex flex-col justify-start items-start gap-5 2xl:px-16 xl:px-14 xl:pt-20 md:pt-5 sm:p-5'>
          <h1
            className='2xl:text-6xl 2xl:w-[80%] 2xl:leading-[70px] xl:w-full xl:leading-[60px] xl:text-5xl lg:text-5xl md:text-4xl 
          md:w-full md:leading-[50px] sm:text-[30px] sm:w-full '
          >
            The ease of buying and renting a dream house & apartment
          </h1>
          <p className='2xl:w-[60%] xl:text-xl md:w-full md:text-lg sm:text-lg sm:w-full '>
            No matter how quickly you need to make an offer, our data and
            experts are always available. Let&quot;s start here
          </p>
        </section>
        <Image
          src={'/yellowChair.avif'}
          alt='home'
          width={1000}
          height={1000}
          className='xl:rounded-r-lg xl:rounded-t-none xl:flex lg:flex md:flex md:w-[50%] sm:flex sm:rounded-r-none sm:rounded-t-lg sm:w-full object-cover'
        />
      </section>

      <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='xl:text-5xl md:text-4xl sm:text-3xl '>Our Services</h1>
        <section
          className='grid mx-auto 2xl:w-[80%] xl:grid-cols-3 xl:gap-5 xl:place-items-center xl:p-14 xl:w-[90%] md:p-5 md:grid-cols-1 md:gap-5 md:w-full
      sm:p-5 sm:gap-5 '
        >
          <article className='grid grid-cols-1 place-items-start gap-4 bg-[#090030] text-white p-5 rounded-md shadow-2xl '>
            <Image
              src='/house.png'
              alt='Home icon'
              width={500}
              height={500}
              className='bg-[#4d27f79c] p-5 rounded-md flex justify-center items-center w-[100px] h-[100px] object-cover '
            />
            <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl '>
              Buy a home
            </h1>
            <p className=' xl:w-full md:w-[70%] '>
              Find your place with an immersive photo experience and the most
              listings, including the things you won't find anywhere else.
            </p>
            <Link
              href='/learnmore'
              className='text-[#F30A49] font-medium underline flex justify-start items-center gap-2 '
            >
              Learn More <FontAwesomeIcon icon={faArrowRight} />{' '}
            </Link>
          </article>
          <article className='grid grid-cols-1 place-items-start gap-4 bg-[#090030] text-white p-5 rounded-md shadow-2xl '>
            <Image
              src='/rent.png'
              alt='Home icon'
              width={500}
              height={500}
              className='bg-[#4d27f79c] p-5 rounded-md flex justify-center items-center w-[100px] h-[100px] object-cover '
            />
            <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl '>
              Rent a home
            </h1>
            <p className=' xl:w-full md:w-[70%] '>
              We're creating a seamless online experience - from shopping on the
              largest rental network, to applying to paying rents.
            </p>
            <Link
              href='/learnmore'
              className='text-[#F30A49] font-medium underline flex justify-start items-center gap-2 '
            >
              Learn More <FontAwesomeIcon icon={faArrowRight} />{' '}
            </Link>
          </article>
          <article className='grid grid-cols-1 place-items-start gap-4 bg-[#090030] text-white p-5 rounded-md shadow-2xl '>
            <Image
              src='/sale.png'
              alt='Home icon'
              width={500}
              height={500}
              className='bg-[#4d27f79c] p-5 rounded-md flex justify-center items-center w-[100px] h-[100px] object-cover '
            />
            <h1 className='2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl '>
              Sell a home
            </h1>
            <p className=' xl:w-full md:w-[70%] '>
              Whether you get a cash offer through offers or choose to sell
              traditionally, we can help you navigate a successful sale.{' '}
            </p>
            <Link
              href='/learnmore'
              className='text-[#F30A49] font-medium underline flex justify-start items-center gap-2 '
            >
              Learn More <FontAwesomeIcon icon={faArrowRight} />{' '}
            </Link>
          </article>
        </section>
      </div>
    </main>
  )
}
