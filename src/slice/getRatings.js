import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const getReviews = createAsyncThunk(
  'listing/reviews',
  async (id, { dispatch }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_DEV}/api/listings/${id}/ratings`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          //   body: JSON.stringify({ listingId: listing_id }),
        }
      )
      const data = await response.json()

      if (data.status === true) {
        dispatch(setRatings(data.ratings))
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const ratings = createSlice({
  name: 'ratings',
  initialState: {
    ratings: null,
  },
  reducers: {
    setRatings: (state, action) => {
      state.ratings = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getReviews.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setRatings } = ratings.actions
export default ratings.reducer
