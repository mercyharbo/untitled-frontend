import DashboardLayout from '@/components/DashboardLayout'
import { useState } from 'react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Notification')

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col p-5'>
        <section className='rounded-lg bg-white shadow-2xl flex gap-5 py-3 cursor-pointer'>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center ${
              activeTab === 'Notification'
                ? 'bg-color3 text-white h-[40px] rounded-md'
                : ''
            }`}
            onClick={() => handleTabClick('Notification')}
          >
            Notification
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center ${
              activeTab === 'Password'
                ? 'bg-color3 text-white h-[40px] rounded-md '
                : ''
            }`}
            onClick={() => handleTabClick('Password')}
          >
            Password
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center ${
              activeTab === 'Privacy'
                ? 'bg-color3 text-white h-[40px] rounded-md'
                : ''
            }`}
            onClick={() => handleTabClick('Privacy')}
          >
            Privacy
          </span>
        </section>

        {activeTab === 'Notification' && (
          <section className='py-5'>
            <h1 className='text-4xl'>Notification</h1>
          </section>
        )}

        {activeTab === 'Password' && (
          <section className='py-5'>
            <h1 className='text-4xl'>Password</h1>
          </section>
        )}

        {activeTab === 'Privacy' && (
          <section className='py-5'>
            <h1 className='text-4xl'>Privacy</h1>
          </section>
        )}
      </main>
    </DashboardLayout>
  )
}

export default Settings
