import { configureStore } from '@reduxjs/toolkit'
import contactsData from '../features/contactSlice'

export const store = configureStore({
  reducer: {
    contacts : contactsData,
  },
})