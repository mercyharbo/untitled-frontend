import { faFilter, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

const HeaderFilter = ({
  setActiveTab,
  setMobileFilter,
  setSearchQuery,
  searchQuery,
  handleGridViewClick,
  handleListViewClick,
  activeTab,
}) => {
  const total = useSelector((state) => state.listings.total)

  return (
    <main className=''>
      <article className='tabs flex lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:gap-5 '>
        <div className='flex lg:flex-row lg:justify-start lg:items-center md:justify-start md:items-center md:gap-8 sm:flex-row sm:justify-between sm:gap-5'>
          <button
            type='button'
            onClick={() => setActiveTab('All Listings')}
            className={`lg:text-lg font-semibold relative ${
              activeTab === 'All Listings'
                ? 'text-[#023047] absolute lg:after:w-1/2 lg:after:h-[10px] md:after:top-10 sm:after:top-7 border-b-4 border-[#023047] lg:after:top-4 left-0 '
                : ''
            }`}
          >
            All Listings
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('Recently Added')}
            className={`lg:text-lg font-semibold ${
              activeTab === 'Recently Added'
                ? 'text-[#023047] relative after:absolute after:w-1/2 after:h-[10px] border-b-4 border-[#023047] after:top-4 left-0 '
                : ''
            }`}
          >
            Recently Added
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('Featured')}
            className={`lg:text-lg font-semibold ${
              activeTab === 'Featured'
                ? 'text-[#023047] relative after:absolute after:w-1/2 after:h-[10px] border-b-4 border-[#023047] after:top-4 left-0 '
                : ''
            }`}
          >
            Featured
          </button>
        </div>

        <div className='relative'>
          <input
            type='text'
            name='search'
            placeholder='Search property'
            className='lg:h-[45px] lg:w-[350px] sm:w-full sm:h-[50px] border rounded-full indent-3 '
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </article>

      <article className='flex sm:justify-between sm:items-center md:justify-between md:items-center lg:justify-between lg:items-center relative py-4'>
        <button
          type='button'
          onClick={() => setMobileFilter(true)}
          className='outline-none lg:hidden md:flex sm:flex'
        >
          <FontAwesomeIcon icon={faFilter} className='text-[25px]' />
        </button>

        <h1 className='flex justify-start items-center gap-2 2xl:text-2xl'>
          Total: {total}
        </h1>

        <div className='flex justify-end items-center gap-4'>
          <button type='button' onClick={handleListViewClick}>
            {' '}
            <FontAwesomeIcon icon={faList} className='text-[25px]' />
          </button>
          <button type='button' onClick={handleGridViewClick}>
            <svg
              id='Capa_1'
              x='0px'
              y='0px'
              viewBox='0 0 512 512'
              width='25'
              height='25'
            >
              <g>
                <path d='M85.333,0h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,234.667,0,196.462,0,149.333v-64C0,38.205,38.205,0,85.333,0z' />
                <path d='M362.667,0h64C473.795,0,512,38.205,512,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,38.205,315.538,0,362.667,0z' />
                <path d='M85.333,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,512,0,473.795,0,426.667v-64C0,315.538,38.205,277.333,85.333,277.333z' />
                <path d='M362.667,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64C512,473.795,473.795,512,426.667,512h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,315.538,315.538,277.333,362.667,277.333z' />
              </g>
            </svg>
          </button>
        </div>
      </article>
    </main>
  )
}

export default HeaderFilter
