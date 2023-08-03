import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const getNotifications = createAsyncThunk(
  'notification',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/notification`,
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
        dispatch(setActivities(data.activities))
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const notificationsActivities = createSlice({
  name: 'notifications',
  initialState: {
    activities: null,
    loading: false,
    notifyModal: false,
  },
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setNotifyModal: (state, action) => {
      state.notifyModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getNotifications.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setActivities, setNotifyModal } = notificationsActivities.actions
export default notificationsActivities.reducer
