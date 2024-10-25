import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'

interface GlobalState { }

const initialState: GlobalState = {}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {},
})



export default globalSlice.reducer