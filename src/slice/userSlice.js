import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProfile = createAsyncThunk(
  'profile',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data?.status === true) {
        dispatch(setUserProfile(data.profile))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
        // setErrorMsg(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  userProfile: [],
  loading: false,
  token: null,
  selectedImage: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProfile.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setUserProfile, setLoading, setSelectedImage } =
  userSlice.actions
export default userSlice.reducer
