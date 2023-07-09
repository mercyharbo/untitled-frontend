import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  const router = useRouter()

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const handleRouteChange = () => {
    window.scrollTo(0, 0)
  }

  // Attach the route change event listener
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)

    // Clean up the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <motion.main
      key={router.route}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      {/* <SideBar /> */}
      <section>{children}</section>
    </motion.main>
  )
}

export default Layout
