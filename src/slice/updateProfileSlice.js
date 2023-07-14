import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { setUserProfile } from './userSlice'

export const updateUserProfile = createAsyncThunk(
  '/profile/update',
  async (values, { dispatch, getState }) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const selectedImage = values.avatarUrl // Extract the selectedImage from the values object

    const updatedProfile = {
      ...values, // Use the values object directly
      avatarUrl: selectedImage || values?.avatarUrl,
    }

    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/profile?userId=${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      )

      const data = await response.json()

      if (data?.status === true) {
        dispatch(setUserProfile(updatedProfile))
        toast.success(data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
        dispatch(setProfileModal(false))
        return updatedProfile
      } else {
        toast.failure('Failed to update your profile', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

const initialState = {
  loading: false,
  profileModal: false,
  selectedImage: null,
}

const updateProfile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.favListing = action.payload
    },
    setProfileModal: (state, action) => {
      state.profileModal = action.payload
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateUserProfile.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setLoading, setProfileModal, setSelectedImage } =
  updateProfile.actions
export default updateProfile.reducer
