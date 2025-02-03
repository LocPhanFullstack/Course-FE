'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import globalReducer from '@/state'
import { useRef } from 'react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'

// REDUX STORE
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  })
}

// REDUX TYPES
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// PROVIDERS
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
    setupListeners(storeRef.current.dispatch)
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
