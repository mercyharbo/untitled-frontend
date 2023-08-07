import DashboardLayout from '@/components/DashboardLayout'
import InputField from '@/hooks/InputField'
import Button from '@/hooks/button'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('Password')

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      // Make the POST request to /api/reset-password using fetch
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      )

      const data = await response.json()

      if (data?.status === true) {
        toast.success(data?.message)
        setLoading(false)
      } else {
        toast.error(data?.error)
        setLoading(false)
      }

      // Handle success
      // You can show a success message or redirect to another page
      // For this example, we'll just reset the form
      resetForm()
    } catch (error) {
      console.error('Error:', error.message)
      setLoading(false)
      // Handle error
      // You can show an error message or perform other actions
    } finally {
      setSubmitting(false)
      setLoading(false)
    }
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

            <Formik
              initialValues={{ currentPassword: '', newPassword: '' }}
              onSubmit={handleSubmit}
            >
              <Form className='py-5 flex flex-col gap-7'>
                <div className='flex flex-col gap-2 w-full relative'>
                  <label htmlFor='currentPassword' className='font-medium'>
                    Current password:
                  </label>
                  <InputField
                    placeholder='Current password'
                    // id='currentPassword'
                    type={showPassword ? 'text' : 'password'}
                    name='currentPassword'
                    className='w-full'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(true)}
                    className='absolute top-[3rem] right-4'
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <div className='flex flex-col gap-2 w-full relative'>
                  <label htmlFor='newPassword' className='font-medium'>
                    New password:
                  </label>
                  <InputField
                    placeholder='New password'
                    // id='newPassword'
                    type={showPassword ? 'text' : 'password'}
                    name='newPassword'
                    className='w-full'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(true)}
                    className='absolute top-[3rem] right-4'
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <Button
                  label={loading ? 'Resetting...' : 'Save'}
                  type='submit'
                  name='submit'
                  className='h-[50px] rounded-md '
                />
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
