import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  state: '',
  city: '',
  phoneNumber: '',
  address: '',
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload
    },
    setLastname: (state, action) => {
      state.lastname = action.payload
    },
    setState: (state, action) => {
      state.state = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    resetSignup: () => initialState,
  },
})

export const {
  setEmail,
  setUsername,
  setPassword,
  setFirstname,
  setLastname,
  setState,
  setCity,
  setPhoneNumber,
  setAddress,
  resetSignup,
} = signupSlice.actions

export default signupSlice.reducer
