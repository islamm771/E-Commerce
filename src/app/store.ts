import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import globalSlice from './features/globalSlice'
import loginSlice from "./features/loginSlice"

export const store = configureStore({
    reducer: {
        global: globalSlice,
        login: loginSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()