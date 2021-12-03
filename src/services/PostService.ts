import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPostType} from "../models/IPost";

export const postAPI = createApi({
    reducerPath: 'postAPI', //уникальный ключ, определяющий сервис,
    baseQuery:
        fetchBaseQuery({
            baseUrl: 'http://localhost:5000/',
        }),
    //куда объект нужно добавить - решаем проблему чтобы при добавлении
    // поста он сразу появлялся. Проставляем теги
    tagTypes: ['Post'],
    endpoints: (build) => ({
        // куда отправляет запросы -возвращаем объект
        //fetchAllUsers название метода, с помощью которого будем получать
        // или изменять данные
        //query - для получений данных (get)
        //mutation - для изменения данных (post, put, delete)
        // 1-ыйIPostType[] - что вернет,
        // 2-ой параметр - тип аргумента, который ожидает хук
        fetchAllPosts: build.query<IPostType[], number>({

            //будем делать постраничный вывод (пагинацию), укажем лимит (5 по умлоч)
            // будем возвращ 5 элементов в массиве
            query: (limit: number = 5) => ({
                //функция возвращ объект, которая принимает аргументы необходимые для запроса
                url:`/posts`, //приплюсуется к baseUrl
                params: {
                    //указываем queryParameter, который будет уходить на сервер -
                    // те что после ? в поисковой строке
                    _limit: limit,
                }
            }),
            //end point работает с тегом Post - обеспечивает доставку данных
            providesTags: result => ['Post']
        }),
        //будем создавать пост
        createPost: build.mutation<void, IPostType>({
            query: (post:IPostType ) => ({
                url:`/posts`, //приплюсуется к baseUrl
                method: 'POST',
                body: post //помещаем переданный объект в тело запроса
            }),
            invalidatesTags: ['Post'] //данные становятся неактуальные
            // при создании поста и мы должны эти данные заново получить
        }),
        //будем обновлять пост
        updatePost: build.mutation<IPostType, IPostType>({
            query: (post:IPostType ) => ({
                url:`/posts/${post.id}`, //приплюсуется к baseUrl
                method: 'PUT',
                body: post //помещаем переданный объект в тело запроса
            }),
            invalidatesTags: ['Post'] //данные становятся неактуальные
            // при создании поста и мы должны эти данные заново получить
        }),
        //будем удалять пост
        deletePost: build.mutation<void, IPostType>({
            query: (post:IPostType ) => ({
                url:`/posts/${post.id}`, //приплюсуется к baseUrl
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'] //данные становятся неактуальные
            // при создании поста и мы должны эти данные заново получить
        }),


    })
})