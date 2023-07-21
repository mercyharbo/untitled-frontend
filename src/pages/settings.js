import DashboardLayout from '@/components/DashboardLayout'
import InputField from '@/hooks/InputField'
import Button from '@/hooks/button'
import { Form, Formik } from 'formik'
import { useState } from 'react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Password')

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <DashboardLayout>
      <main className='flex flex-row gap-5 p-5'>
        <section className='rounded-lg bg-white shadow-2xl flex flex-col gap-5 p-4 cursor-pointer xl:w-[20%] '>
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
          <section className='py-5 bg-white shadow-2xl rounded-lg p-5 xl:w-full '>
            <h1 className='text-4xl'>Change Password</h1>
            <p className=''>
              You can change your accpunt password by entering your current
              password and the new password you want to use.
            </p>

            <Formik initialValues={{ current_password: '', new_password: '' }}>
              <Form className='py-5 flex flex-col gap-7'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor='current_password' className='font-medium'>Current password:</label>
                  <InputField
                    placeholder='Current password'
                    id='current_password'
                    type={'password'}
                    name='current_password'
                    className='w-full'
                  />
                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor='new_password' className='font-medium'>New password:</label>
                  <InputField
                    placeholder='Current password'
                    id='new_password'
                    type={'password'}
                    name='new_password'
                    className='w-full'
                  />
                  <InputField
                    placeholder='Current password'
                    id='new_password'
                    type={'password'}
                    name='new_password'
                    className='w-full'
                  />
                </div>

                <Button label='Save' type='submit' name='submit' className='h-[50px] rounded-md ' />
              </Form>
            </Formik>
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
