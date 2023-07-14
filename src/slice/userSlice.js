import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProfile = createAsyncThunk(
  'profile',
  async (userId, { dispatch }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/profile?userId=${userId}`,
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

  searchQuery: '',
  editProfileModal: false,
  searched: [],
  // selectedImage: null,
  searchProperties: '',
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
    // setSelectedImage: (state, action) => {
    //   state.selectedImage = action.payload
    // },
    setSearchProperties: (state, action) => {
      state.searchProperties = action.payload
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

export const {
  setUserProfile,
  setToken,
  setSearchQuery,
  setEditProfileModal,
  setSearched,
  // setSelectedImage,
  setSearchProperties,
  setLoading,
} = userSlice.actions
export default userSlice.reducer
