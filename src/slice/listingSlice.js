import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listings: [],
  listingDetail: [],
  loading: true,
  total: null,
  addListingModal: false,
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
  },
})

export const {
  setListings,
  setListingDetail,
  setLoading,
  setTotal,
  setAddListingModal,
} = listingsSlice.actions
export default listingsSlice.reducer
