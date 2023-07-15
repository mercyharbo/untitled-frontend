import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/logout`,
        {
          method: 'POST',
        }
      )
      const data = await response.json()
      if (data?.status === true) {
        localStorage.removeItem('token')
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  loading: false,
  token: null,
}

const logoutSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setLoading, setToken } = logoutSlice.actions
export default logoutSlice.reducer
