import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: {},
  token: null,
  searchQuery: '',
  editProfileModal: false,
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
  },
})

export const { setUserProfile, setToken, setSearchQuery, setEditProfileModal } =
  userSlice.actions
export default userSlice.reducer
