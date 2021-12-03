import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from './reducers/UserSlice'
import {postAPI} from "../services/PostService";
import {commentAPI} from "../services/CommentService";
import {commentReducer} from "./reducers/CommentSlice";


export const rootReducer = combineReducers({
    userReducer,
    commentReducer,
    [postAPI.reducerPath]: postAPI.reducer, //postAPI.reducer - сеодержит методы из endpoints
    [commentAPI.reducerPath]: commentAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //getDefaultMiddleware - middleware подключенные к reduxToolkit )thunk включая
        //concat(postAPI.middleware) - добавили middleware из postAPI
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(postAPI.middleware, commentAPI.middleware)
    })
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']