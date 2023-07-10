import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EmptyState = () => {
  return (
    <article className='flex flex-col justify-center items-center gap-5 m-auto 2xl:pt-[10rem] md:pt-10 sm:pt-5 text-center '>
      <FontAwesomeIcon
        icon={faCircleExclamation}
        className='xl:text-8xl md:text-8xl sm:text-6xl '
      />
      <h1 className='xl:text-4xl md:text-2xl sm:text-2xl'>
        Sorry, there is no listing to display
      </h1>
      <p className='text-[gray] xl:w-[70%] '>
        You can be the first to add a listing, make the timeline look more
        engaging and lovely.
      </p>
    </article>
  )
}

export default EmptyState
