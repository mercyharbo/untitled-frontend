import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  loading: true,
  errorMsg: null,
}

const usersAccountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload
    },
  },
})

export const { setUser, setErrorMsg, setLoading } = usersAccountSlice.actions
export default usersAccountSlice.reducer
