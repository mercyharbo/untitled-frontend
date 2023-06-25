import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: {},
  token: null,
  searchQuery: '',
  editProfileModal: false,
  searched: [],
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
  },
})

export const {
  setUserProfile,
  setToken,
  setSearchQuery,
  setEditProfileModal,
  setSearched,
} = userSlice.actions
export default userSlice.reducer
