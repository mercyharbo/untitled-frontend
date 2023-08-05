import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DashboardLayout from '@/components/DashboardLayout'
import Button from '@/hooks/button'
import { getNotifications } from '@/slice/notificationSlice'

const Notifications = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications.activities)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  const handleMarkAllAsRead = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/notification/mark-all-as-read`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (data.status === true) {
        router.reload()
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
      return rejectWithValue('An error occurred. Please try again later.')
    }
  }

  return (
    <DashboardLayout>
      <main className='p-10'>
        <div className='flex justify-between items-center py-5'>
          <h1 className='text-2xl'>Notifications</h1>
          {notification?.length > 0 && (
            <Button
              type='button'
              label='Mark all as read'
              onClick={handleMarkAllAsRead}
              className='rounded-lg h-[60px] py-2 '
            />
          )}
        </div>
        <div className='flex flex-col gap-5'>
          {notification
            ?.map((activities, index) => {
              return (
                <div
                  key={index}
                  className='flex justify-start items-start gap-3 relative after:absolute after:w-full after:border-b-2 after:border-softgrey after:-bottom-2 '
                >
                  {activities.isRead === false && (
                    <div className='p-1 mt-2 rounded-full bg-red shadow-lg'></div>
                  )}

                  <div className='flex flex-col gap-2 '>
                    <div className='flex flex-col flex-wrap '>
                      <h1 className='text-[14px] capitalize '>
                        {activities?.activity}
                      </h1>
                      {/* {activities?.comment && (
                        <p className='text-[14px] text-[grey] '>
                          <ShortenedText
                            text={activities?.comment}
                            maxLength={150}
                          />
                        </p>
                      )} */}
                      {activities?.comment}
                    </div>
                    <span className='text-[11px] text-[#8097a5] '>
                      {moment(activities?.createdAt)?.fromNow()}
                    </span>
                  </div>
                </div>
              )
            })
            .reverse()}
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Notifications
