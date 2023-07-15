import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListingDetails = createAsyncThunk(
  'listings/fetchListingDetails',
  async (id, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (data.status === true) {
        dispatch(setListingDetail(data.listing))
        dispatch(setLoading(false))
      } else {
        console.log('there is an error')
      }
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  listingDetail: [],
  loading: false,
  listingUpdateModal: false,
}

const listingDetailSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListingDetail: (state, action) => {
      state.listingDetail = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setListingUpdateModal: (state, action) => {
      state.listingUpdateModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListingDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchListingDetails.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setListingDetail, setLoading, setListingUpdateModal } =
  listingDetailSlice.actions
export default listingDetailSlice.reducer
