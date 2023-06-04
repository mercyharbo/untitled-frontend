import Image from 'next/image'

const Profile = () => {
  return (
    <main className='p-10'>
      <h1 className='xl:text-5xl lg:text-4xl md:text-4xl sm:text-3xl py-2 font-bold '>
        {' '}
        Welcome to my profile{' '}
      </h1>
      <div className='flex xl:flex-row md:flex-col sm:flex-col gap-5 '>
        <div className=''>
          <Image
            src='https://images.unsplash.com/photo-1685295401439-c73adeb4d93c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
            alt=''
            width={400}
            height={400}
            className='xl:w-[200px] xl:h-[150px] lg:w-[100px] lg:h-[100px] md:w-[100px] md:h-[100px] sm:h-[50px] sm:w-[50px] rounded-full '
          />
        </div>
        <div className='flex flex-col justify-start items-start gap-5 w-[60%] '>
          <h3 className='text'>Praise Doumar</h3>
          <p className=''>
            Sure, here is a 300 character random text: The sun was setting over
            the horizon, casting a fiery glow across the sky. The air was still
            and silent, save for the occasional chirping of birds. A lone figure
            stood on a hilltop, looking out at the vast landscape. She was lost
            in thought, her mind wandering back to the past. She remembered a
            time when life was simpler, when she didn't have a care in the
            world. But those days were gone now. She was older now, and the
            world was a much different place. But she still held on to hope,
            hope that one day things would be better.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Profile
