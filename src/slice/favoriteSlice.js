import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const getFavorites = createAsyncThunk(
  'listings/getFavorites',
  async ({ dispatch }) => {
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
        dispatch(setFavorites(data.favorites))
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
  },
})

export const { setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
