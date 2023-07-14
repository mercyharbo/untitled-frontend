import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUser = createAsyncThunk(
  'user/profile',
  async (id, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/users/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      if (data?.status === true) {
        dispatch(setUser(data.user))
        dispatch(setUserListing(data.listings))
        dispatch(setSoldListing(data.soldListings))
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

const userProfile = createSlice({
  name: 'user',
  initialState: {
    user: [],
    userListing: [],
    soldListing: [],
    loading: false,
    error: null,
  },
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
    setUserListing: (state, action) => {
      state.userListing = action.payload
    },
    setSoldListing: (state, action) => {
      state.soldListing = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const {
  setErrorMsg,
  setLoading,
  setUser,
  setSoldListing,
  setUserListing,
} = userProfile.actions
export default userProfile.reducer
