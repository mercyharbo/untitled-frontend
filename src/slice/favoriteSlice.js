import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const getFavorites = createAsyncThunk(
  'listing/favorites',
  async (_, { dispatch, getState }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/favorites`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.status === true) {
        dispatch(setFavListing(data.favorites))
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  favListing: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavListing: (state, action) => {
      state.favListing = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavorites.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getFavorites.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setFavListing } = favoritesSlice.actions
export default favoritesSlice.reducer
