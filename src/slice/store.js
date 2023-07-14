import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import singupSlice from './singupSlice'
import listingSlice from './listingSlice'
import favoriteSlice from './favoriteSlice'
import listingDetailSlice from './listingDetailSlice'
import userProfile from './userProfile'
import updateProfileSlice from './updateProfileSlice'
import searchSlice from './searchSlice'

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
  },
  devTools: process.env.NODE_ENV !== 'production',
})
