import Head from 'next/head'
import { useState } from 'react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Notification')

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <>
      {' '}
      <Head>
        <title> Untitled Realty | Settings </title>
        <meta
          name='description'
          content='Access the exclusive realtor login at Untitled Realty and unlock your dream home. Discover personalized listings, powerful tools, and expert guidance to make your real estate journey a success. Join our network of top realtors and gain an edge in the competitive housing market.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex'>
        <section
          className='2xl:w-[20%] xl:w-[20%] xl:flex-col xl:justify-start xl:items-start md:flex-col md:justify-start md:items-start md:w-[20%] 
      sm:flex-row sm:justify-between sm:items-center sm:w-full sm:p-3 rounded-lg bg-white shadow-2xl flex gap-2 cursor-pointer'
        >
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Profile' ? 'bg-[#F30A49] h-[40px] rounded-md' : ''
            }`}
            onClick={() => handleTabClick('Profile')}
          >
            Profile
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Notification'
                ? 'bg-[#F30A49] h-[40px] rounded-md'
                : ''
            }`}
            onClick={() => handleTabClick('Notification')}
          >
            Notification
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Password'
                ? 'bg-[#F30A49] h-[40px] rounded-md '
                : ''
            }`}
            onClick={() => handleTabClick('Password')}
          >
            Password
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Privacy' ? 'bg-[#F30A49] h-[40px] rounded-md' : ''
            }`}
            onClick={() => handleTabClick('Privacy')}
          >
            Privacy
          </span>
        </section>

        {activeTab === 'Notification' && (
          <section className=''>
            <h1 className='text-4xl font-semibold'>Notification</h1>
          </section>
        )}

        {activeTab === 'Password' && (
          <section className=''>
            <h1 className='text-4xl font-semibold'>Password</h1>
          </section>
        )}

        {activeTab === 'Privacy' && (
          <section className=''>
            <h1 className='text-4xl font-semibold'>Privacy</h1>
          </section>
        )}
      </main>
    </>
  )
}

export default Settings