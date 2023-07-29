import DashboardLayout from '@/components/DashboardLayout'
import { getReviews } from '@/slice/getRatings'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import moment from 'moment/moment'
import Link from 'next/link'

const Reviews = () => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const ratings = useSelector((state) => state.ratings.ratings)

  useEffect(() => {
    dispatch(getReviews(id))
  }, [])

  return (
    <DashboardLayout>
      <main className='p-10'>
        <div className='flex gap-1 text-2xl text-[gray] font-semibold '>
          <Link href={`/listings/${id}`} className='hover:text-color3'>
            Listing
          </Link>
          /
          <Link href={`/reviews/${id}`} className='hover:text-color3'>
            Reviews & Rating
          </Link>
        </div>
        <div className='flex flex-col gap-5 py-5 xl:w-[70%] '>
          {ratings?.map((userRatings) => {
            return (
              <article
                key={userRatings._id}
                className='bg-white p-2 shadow-md rounded-md border-2 border-softgrey flex flex-col gap-2 cursor-pointer hover:border-color3 '
              >
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <h1 className='capitalize'>{userRatings.name}</h1>
                    <span className='text-sm text-[gray] '>
                      {moment(userRatings.createdAt).fromNow()}
                    </span>
                  </div>
                  <ReactStars
                    count={5}
                    size={20}
                    value={userRatings.rating}
                    activeColor='#ffd700'
                    edit={false}
                    isHalf={true} // Allow half-star increments
                  />
                </div>

                <p>{userRatings.comment}</p>
              </article>
            )
          })}
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Reviews
