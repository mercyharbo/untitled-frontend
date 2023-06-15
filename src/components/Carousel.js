import { useEffect, useState } from 'react'

export default function Carousel({
  children: slides,
  autoplay = false,
  autoplayInterval = 3000,
}) {
  const [curr, setCurr] = useState(0)

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  }

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  }

  useEffect(() => {
    if (!autoplay) return
    const slideInterval = setInterval(next, autoplayInterval)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <main className='overflow-hidden relative 2xl:left-[10rem] xl:left-[10rem] '>
      <div
        className='flex gap-5 transition-transform ease-in-out duration-500'
        style={{ transform: `translateX(-${curr * 50}%)` }}
      >
        {slides}
      </div>

      {/* <div className='absolute bottom-0 right-0 left-0'>
        <div className='flex items-center justify-center gap-3'>
          {slides?.map((_, i) => (
            <div
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? 'p-2' : 'bg-opacity-50'
              }`}
            ></div>
          ))}
        </div>
      </div> */}
    </main>
  )
}
