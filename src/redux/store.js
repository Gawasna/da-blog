import { configureStore } from '@reduxjs/toolkit'
import courseSliceReducer from './courseSlice'

export default configureStore({
  reducer: {
    course: courseSliceReducer
  }
})