import axios from "axios";
import {IUserType} from "../../models/IUser";
import {createAsyncThunk} from "@reduxjs/toolkit";


/*
export const fetchUsers = () => async (dispatch: AppDispatchType) => {

    dispatch(userSlice.actions.usersFetching());
    try {
        const response = await axios.get<IUserType[]>
        ('https://jsonplaceholder.typicode.com/users');

        dispatch(userSlice.actions.usersFetchingSuccess({users: response.data}))
    } catch (e) {
        dispatch(userSlice.actions.usersFetchingError({error: (e as {message: string}).message}))
    }
}*/

export const fetchUsers = createAsyncThunk<{users: IUserType[]}, undefined, {rejectValue :{error:string}}>('user/fetching',
    async (_,{dispatch, rejectWithValue}) => {

        try {
            const response = await axios.get<IUserType[]>
            ('https://jsonplaceholder.typicode.com/users');

            return {users: response.data}
        } catch (e) {
            return rejectWithValue ({error: (e as {message: string}).message})
        }

})