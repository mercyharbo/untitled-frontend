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

  const goToSlide = (index) => {
    setCurr(index)
  }

  return (
    <main
      className='overflow-x-scroll '
      style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
    >
      <style>
        {`
          .overflow-x-scroll::-webkit-scrollbar {
            width: 0.5em;
            height: 0.5em;
          }

          .overflow-x-scroll::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        `}
      </style>
      <div
        className='flex justify-start items-start gap-5 transition-transform ease-in duration-500'
        style={{
          transform: `translateX(-${curr * 450}px)`,
          width: `${slides.length * 500}px`,
        }}
      >
        {slides}
      </div>

      {/* <div className='absolute bottom-0 right-0 left-0 '>
        <div className='flex items-center justify-center gap-3'>
          {slides?.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? 'p-2' : 'bg-opacity-50'
              }`}
              onClick={() => goToSlide(i)}
            ></div>
          ))}
        </div>
      </div> */}
    </main>
  )
}
