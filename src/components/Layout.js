import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import NavHeader from './navHeader'
import { useSelector } from 'react-redux'
import AddListingModal from './addListing'
import SideBar from './sidebar'

const Layout = ({ children }) => {
  const router = useRouter()
  const addListingModal = useSelector((state) => state.listings.addListingModal)

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
      {/* <NavHeader /> */}

      {addListingModal && <AddListingModal />}

      {/* <SideBar /> */}
      <section>{children}</section>
    </motion.main>
  )
}

export default Layout
