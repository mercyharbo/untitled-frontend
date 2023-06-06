import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listings: [],
  listingDetail: [],
  loading: true,
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
  },
})

export const { setListings, setListingDetail, setLoading } =
  listingsSlice.actions
export default listingsSlice.reducer
