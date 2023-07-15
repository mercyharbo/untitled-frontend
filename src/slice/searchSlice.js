import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchSearch = createAsyncThunk(
  'user/search',
  async (searchQuery, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/search?q=${searchQuery}`,
        {
          method: 'GET',
        }
      )

      const data = await response.json()
      if (data.status === true) {
        dispatch(setSearchedData(data))
      } else {
        console.log('Cannot find the searched keywords')
      }
    } catch (error) {}
  }
)

const initialState = {
  loading: false,
  searchedData: [],
  searchQuery: '',
  searchListing: '',
}

const searchSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSearchedData: (state, action) => {
      state.searchedData = action.payload
    },
    setSearchListing: (state, action) => {
      state.searchListing = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSearch.fulfilled, (state) => {
      state.loading = false
    })
  },
})

export const { setLoading, setSearchListing, setSearchQuery, setSearchedData } =
  searchSlice.actions
export default searchSlice.reducer
