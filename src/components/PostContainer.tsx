import {postAPI} from "../services/PostService";
import {PostItem} from "./PostItem";
import {useEffect, useState} from "react";
import {IPostType} from "../models/IPost";

export const PostContainer = () => {

    const[limit, setLimit] = useState(50)

    //useFetchAllPostsQuery - автоматически сгенерированный хук по названию endPoint
    // запрос произойдет сразу при загрузке страницы
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
       // pollingInterval: 5000 //получаем обновленные данные в определ интервале времени

        //selectFromResult - можем указывать селектор и получать определенные данные,
        // например отфильтрованные по какому-то условию
        selectFromResult: ({ data, error, isLoading}) => ({
            data: data?.filter((post) => post.id > 5),
            error,
            isLoading,
        }),
    });

    //генерируются хуки на основании описаных endpoints
    //1-ый аргумент - параметр который будет использоваться в запросе
    // если нету пишем  ''
    // 5 - limit
    //ошибки и индикация загрузки происходит автоматически
    //refetch - данные заново будут подгружены

    const [createPost,
        {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation();
    //возвращает массив, где
    // 1-ый элемент - функция которую можно вызвать чтобы произошла мутация
    // 2-ой объект в котором находятся поля isLoading, data, error и другие
    //error: createError, isLoading: isCreateLoading - чтобы не было пересечений с другими запросами

    //изменим через 3 секунды лимит
    useEffect(() => {
        /*setTimeout(() => {
            setLimit(3)
        }, 3000)*/
    })

    const[deletePost, {}] = postAPI.useDeletePostMutation()
    const[updatePost, {}] = postAPI.useUpdatePostMutation()

    const handleCreatePost = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPostType).unwrap()
    }
    const handleRemovePost = async (post: IPostType) => {
        deletePost(post).unwrap()
    }
    const handleUpdatePost = async (post: IPostType) => {
        updatePost(post).unwrap()
    }

    return (
        <div>
            {isLoading && <div>loading ...</div>}
            {
                posts && posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                        removePost={handleRemovePost}
                        updatePost={handleUpdatePost}
                    />
                ))
            }
            {error && <div>Произошла ошибка при загрузке</div>}
            <button onClick={handleCreatePost}>new post</button>
            <button onClick={() => refetch()}>REFETCH</button>
        </div>
    )
}