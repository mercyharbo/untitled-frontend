import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import singupSlice from './singupSlice'
import listingSlice from './listingSlice'
import favoriteSlice from './favoriteSlice'
import listingDetailSlice from './listingDetailSlice'
import userProfile from './userProfile'
import updateProfileSlice from './updateProfileSlice'
import searchSlice from './searchSlice'
import logoutSlice from './logoutSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    signup: singupSlice,
    listings: listingSlice,
    listingDetail: listingDetailSlice,
    userProfileDetails: userProfile,
    favorite: favoriteSlice,
    updateProfile: updateProfileSlice,
    search: searchSlice,
    logout: logoutSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
