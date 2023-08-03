import DashboardLayout from '@/components/DashboardLayout'
import ShortenedText from '@/hooks/ShortenedText'
import { getNotifications } from '@/slice/notificationSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Notifications = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications.activities)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  return (
    <DashboardLayout>
      <main className='p-10'>
        <div className='flex justify-between items-center'>
          <h1 className=''>Notifications</h1>
          <p className='text-sm'>Do not disturb </p>
        </div>
        {notification?.map((activities, index) => {
          return (
            <div
              key={index}
              className='flex justify-start items-start gap-3 relative after:absolute after:w-full after:border-b-2 after:border-softgrey after:-bottom-2 '
            >
              <div className='p-1 mt-2 rounded-full bg-red shadow-lg'></div>

              <div className='flex flex-col gap-2 '>
                <div className='flex flex-col flex-wrap '>
                  <h1 className='text-[14px] capitalize '>
                    {activities.activity}
                  </h1>
                  {activities.comment && (
                    <p className='text-[14px] text-[grey] '>
                      <ShortenedText
                        text={activities.comment}
                        maxLength={150}
                      />
                    </p>
                  )}
                </div>
                <span className='text-[11px] text-[#8097a5] '>
                  {moment(activities.createdAt).fromNow()}
                </span>
              </div>
            </div>
          )
        })}
      </main>
    </DashboardLayout>
  )
}

export default Notifications
