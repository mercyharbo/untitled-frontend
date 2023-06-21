import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: {},
  token: null,
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
  },
})

export const { setUserProfile, setToken } = userSlice.actions
export default userSlice.reducer
