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

  addListingModal: false,
  editListing: [],
  modal: false,
  userListings: [],
}

const listingDetailSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListingDetail: (state, action) => {
      state.listingDetail = action.payload
    },

    setAddListingModal: (state, action) => {
      state.addListingModal = action.payload
    },

    setEditListing: (state, action) => {
      state.editListing = action.payload
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setUserListings: (state, action) => {
      state.userListings = action.payload
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

export const {
  setListingDetail,
  setLoading,
  setAddListingModal,
  setEditListing,
  setModal,
  setUserListings,
} = listingDetailSlice.actions
export default listingDetailSlice.reducer
