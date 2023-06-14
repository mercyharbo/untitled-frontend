import Image from 'next/image'

export default function Home() {
  return (
    <main className='2xl:pb-14'>
      <div
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
          className='xl:rounded-r-lg xl:rounded-t-none xl:flex lg:flex md:flex md:w-[50%] sm:flex sm:rounded-r-none sm:rounded-t-lg sm:w-full'
        />
      </div>
    </main>
  )
}
