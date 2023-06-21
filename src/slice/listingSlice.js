import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listings: [],
  listingDetail: [],
  loading: true,
  total: null,
  addListingModal: false,
  totalPages: null,
  filteredListing: [],
}

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload
      // state.filteredListing = action.payload
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
} = listingsSlice.actions
export default listingsSlice.reducer
