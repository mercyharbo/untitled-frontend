import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import singupSlice from './singupSlice'
import listingSlice from './listingSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    signup: singupSlice,
    listings: listingSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
