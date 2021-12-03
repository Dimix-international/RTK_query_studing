import {IUserType} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./ActionCreators";

type UserStateType = {
    users:IUserType[],
    isLoading: boolean,
    error:string | null,
}

const initialState: UserStateType = {
    users: [],
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /*usersFetching(state) {
            state.isLoading = true;
        },
        usersFetchingSuccess(state, action: PayloadAction<{users: IUserType[]}>) {
            state.isLoading = false;
            state.error = null;
            state.users = action.payload.users

        },
        usersFetchingError(state, action: PayloadAction<{error:string}>) {
            state.isLoading = false;
            state.error = action.payload.error
        },*/
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.users = action.payload.users
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.error || null
        });
    }
})
export const userReducer= userSlice.reducer;