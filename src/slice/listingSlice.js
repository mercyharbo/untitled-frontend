import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (page, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings?page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      // Introduce a timeout here (e.g., 5 seconds)
      const TIMEOUT_DURATION = 40000 // 5 seconds
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(null) // Resolve with null to indicate a timeout
        }, TIMEOUT_DURATION)
      })

      const dataPromise = response.json()
      const data = await Promise.race([dataPromise, timeoutPromise])

      if (data === null) {
        // Handle timeout here (e.g., show a message or retry)
        console.log('Request timed out')
      } else if (data.status === true) {
        dispatch(setListings(data.listings))
        dispatch(setTotalPages(data.totalPages))
        dispatch(setLoading(false))
      } else {
        console.log('There is an error')
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  listings: [],
  listingDetail: [],
  loading: false,
  total: null,
  addListingModal: false,
  totalPages: 0,
  filteredListing: [],
  editListing: [],
  modal: false,
  userListings: [],
}

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload
    },
    setListingDetail: (state, action) => {
      state.listingDetail = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setTotal: (state, action) => {
      state.total = action.payload
    },
    setAddListingModal: (state, action) => {
      state.addListingModal = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setFilteredListing: (state, action) => {
      state.filteredListing = action.payload
    },
    setEditListing: (state, action) => {
      state.editListing = action.payload
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setUserListings: (state, action) => {
      state.userListings = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchListings.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const {
  setListings,
  setListingDetail,
  setLoading,
  setTotal,
  setAddListingModal,
  setTotalPages,
  setFilteredListing,
  setEditListing,
  setModal,
  setUserListings,
} = listingsSlice.actions
export default listingsSlice.reducer
