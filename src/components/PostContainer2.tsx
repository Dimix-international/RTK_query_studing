import {postAPI} from "../services/PostService";
import {PostItem} from "./PostItem";

export const PostContainer2 = () => {

    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(50);
    //генерируются хуки на основании описаных endpoints
    //1-ый аргумент - параметр который будет использоваться в запросе
    // если нету пишем  '
    // 5 - limit
    //ошибки и индикация загрузки происходит автоматически
    //запрос произойдет сразу при загрузке страницы


    return (
        <div>
            {isLoading && <div>loading ...</div>}
           {/* {
                posts && posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))
            }*/}
            {error && <div>Произошла ошибка при загрузке</div>}
        </div>
    )
}