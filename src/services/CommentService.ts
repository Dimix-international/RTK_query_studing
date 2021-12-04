import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICommentType} from "../models/IComment";


export const commentAPI = createApi({
    reducerPath: 'commentAPI',
    baseQuery:
        fetchBaseQuery({
            baseUrl: 'http://localhost:5000/',
        }),
    tagTypes: ['Comments', 'Comment'],
    endpoints: (build) => ({
        getAllComments: build.query<ICommentType[], string>({
            query: (limit: string = '') => ({
                url: '/comments',
                params: {
                    _limit: limit
                }
            }),
            // запись Непомнящего
            /*query: (limit: string = '') => `comments?${limit && `_limit=${limit}`}`,*/
            providesTags: (result) =>
                result
                    ? [
                        // если результат есть, то возвращ масив результата,
                        // и для каждого элемента добавляем type Comment и его id
                        ...result.map(({id}) => ({type: 'Comments' as const, id})),
                        {type: 'Comments', id: 'LIST'},
                        //учточняем что работали с Comment, и что это был список
                    ]
                    : [{type: 'Comments', id: 'LIST'}],
            //говорим что это должен был быть список Comment, но он пустой
        }),
        //добавим еще один endPoint, -получим один коммент по id
        getComment:build.query<ICommentType, number>({
            query:(id: number) => ({
                url: `/comments/${id}`,
            }),
            providesTags: (result,arg) => [{type: 'Comments', id: 'LIST'}],
           // providesTags: (result,arg) => [{type: 'Comments', id: `${arg}`}],
        }),
        addComment: build.mutation<void, ICommentType>({ //void - любой параметр
            query: (comment: ICommentType) => ({
                url: 'comments',
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}]
            //уточняем с чем мы работали т.е. что поменялось чтобы данные обновились
        }),
        updateComment: build.mutation<void, ICommentType>({
            query: ({id, ...rest}) => ({
                url: `comments/${id}`,
                method: 'PUT',
                body: rest
            }),
           invalidatesTags: [{type: 'Comments', id: 'LIST'}]
        }),
        deleteComment: build.mutation<void, number>({
            query: (id: number) => ({
                url: `comments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}]
        }),
    })
})

export const
    {
        useGetAllCommentsQuery,
        useGetCommentQuery,
        useAddCommentMutation,
        useUpdateCommentMutation,
        useDeleteCommentMutation,
    } = commentAPI;