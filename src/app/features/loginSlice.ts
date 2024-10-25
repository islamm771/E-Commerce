import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import CookieService from "../../services/CookieService";
import { AxiosError } from "axios";
import { IAxiosError } from "../../interface";


interface ILoginState {
    isLoading: boolean;
    data: unknown;
    error: AxiosError<IAxiosError> | null;
}

const initialState: ILoginState = {
    isLoading: false,
    data: null,
    error: null
}

export const userLogin = createAsyncThunk("login/userLogin", async (user: { email: string, password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const { data } = await axiosInstance.post("/login", user)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const loginSlice = createSlice({
    initialState,
    name: 'login',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            CookieService.set("jwt", action.payload.accessToken, {
                path: "/",
                expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 5)),
            })
            state.error = null;
            // setTimeout(() => {
            //     location.reload();
            // }, 1000)
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as AxiosError<IAxiosError>
            // const error = action.payload as AxiosError<IAxiosError>
        })
    }
})

export default loginSlice.reducer