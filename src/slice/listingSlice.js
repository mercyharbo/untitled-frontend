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
  loading: false,
  addListingModal: false,
  totalPages: 0,
}

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setAddListingModal: (state, action) => {
      state.addListingModal = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
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

export const { setListings, setLoading, setAddListingModal, setTotalPages } =
  listingsSlice.actions
export default listingsSlice.reducer
