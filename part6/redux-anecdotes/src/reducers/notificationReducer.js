import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, action) {
            const message = action.payload
            return message
        },
        clear(state, action) {
            return ''
        }
    }
})

const { notify, clear } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async (dispatch) => {
        // first, clear the previous timer if exist
        if (window._setTimeoutOfSetNotification) {
            clearTimeout(window._setTimeoutOfSetNotification)
        }

        // then, notify and create a new timer
        dispatch(notify(message))
        window._setTimeoutOfSetNotification = 
            setTimeout(() => dispatch(clear()), time * 1000)
    }
}

export default notificationSlice.reducer