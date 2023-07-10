import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: {},
  token: null,
  searchQuery: '',
  editProfileModal: false,
  searched: [],
  selectedImage: null,
  searchProperties: '',
  userListing: [],
  soldListing: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setEditProfileModal: (state, action) => {
      state.editProfileModal = action.payload
    },
    setSearched: (state, action) => {
      state.searched = action.payload
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload
    },
    setSearchProperties: (state, action) => {
      state.searchProperties = action.payload
    },
    setUserListing: (state, action) => {
      state.userListing = action.payload
    },
    setSoldListing: (state, action) => {
      state.soldListing = action.payload
    },
  },
})

export const {
  setUserProfile,
  setToken,
  setSearchQuery,
  setEditProfileModal,
  setSearched,
  setSelectedImage,
  setSearchProperties,
  setUserListing,
  setSoldListing,
} = userSlice.actions
export default userSlice.reducer
