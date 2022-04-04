import { createSlice } from '@reduxjs/toolkit'

let timer

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, level: null },
  reducers: {
    setNotification: (state, action) => {
      const message = action.payload.message
      const level = action.payload.level
      return { message, level }
    },
    clearNotification: () => {
      return { message: null, level: null }
    },
  },
})

const { setNotification, clearNotification } = notificationSlice.actions

export const notify = ({ message, level }) => {
  return (dispatch) => {
    dispatch(setNotification({ message, level }))
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
