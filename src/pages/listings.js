import { useState } from 'react'
import { useSelector } from 'react-redux'

import GridView from '@/components/GridView'
import HeaderFilter from '@/components/ListingsHeader'
import DashboardLayout from '@/components/DashboardLayout'
import Spinner from '@/hooks/LoadingSpinner'

export default function Home() {
  const [activeTab, setActiveTab] = useState('All Listings')

  const loading = useSelector((state) => state.listings.loading)

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen m-auto'>
        <Spinner />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col p-5 w-full'>
        <HeaderFilter setActiveTab={setActiveTab} activeTab={activeTab} />

        {activeTab === 'All Listings' ? (
          <GridView />
        ) : activeTab === 'Recently Added' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Recently added</h1>
          </article>
        ) : activeTab === 'Featured Post' ? (
          <article className='bg-white shadow-2xl rounded-xl w-full h-full'>
            <h1>Featured post </h1>
          </article>
        ) : null}
      </main>
    </DashboardLayout>
  )
}
