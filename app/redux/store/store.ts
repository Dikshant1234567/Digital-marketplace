import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../slices/todo-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']