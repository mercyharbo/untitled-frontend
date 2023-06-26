import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import singupSlice from './singupSlice'
import listingSlice from './listingSlice'
import userAccountSlice from './userAccountSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    signup: singupSlice,
    listings: listingSlice,
    usersAccount: userAccountSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
