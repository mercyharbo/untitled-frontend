import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const AddListingAsFavorite = createAsyncThunk(
  'listing/favorites',
  async (listing_id) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/favorites/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ listingId: listing_id }),
        }
      )
      const data = await response.json()

      if (data.status === true) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const addFavoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: null,
  },
  reducers: {
    setFavorite: (state, action) => {
      state.favorites = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddListingAsFavorite.pending, (state) => {
      state.loading = true
    })
    builder.addCase(AddListingAsFavorite.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setFavorite } = addFavoriteSlice.actions
export default addFavoriteSlice.reducer
