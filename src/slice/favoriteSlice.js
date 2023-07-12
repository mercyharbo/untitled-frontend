import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
  },
})

export const { setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
