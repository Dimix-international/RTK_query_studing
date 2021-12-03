import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const commentSlice = createSlice({
    name: 'user',
    initialState: {
        followingInProgress: [] as Array<number>,
    },
    reducers: {
        commentInProgress(state, action: PayloadAction<{id:number, isFetching: boolean}>) {
            if(action.payload.isFetching) {
                state.followingInProgress.push(action.payload.id)
            } else{
                const index = state.followingInProgress.findIndex(id => id === action.payload.id);
                if(index > -1) {
                    state.followingInProgress.splice(index, 1)
                }
            }

        }
    },
    extraReducers: builder => {

    }
})
export const {commentInProgress} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;