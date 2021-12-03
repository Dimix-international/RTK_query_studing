import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchUsers} from "./store/reducers/ActionCreators";
import {PostContainer} from "./components/PostContainer";
import {PostContainer2} from "./components/PostContainer2";
import {CommentsContainer} from "./components/CommentsContainer";


function App() {

    /*const dispatch = useAppDispatch();
    const {
        users,
        error,
        isLoading
    } = useAppSelector(state => state.userReducer);

    useEffect(() => {

        dispatch(fetchUsers())
    }, [dispatch])*/

    return (
        <div className="App">
            {/*{isLoading && <div>loading ...</div>}
            {
                users.map((user) => (
                    <div key={user.id}>
                        <div>{user.name} - {user.email}</div>
                    </div>
                ))
            }
            {error && <div>{error}</div>}*/}
            <div style={{display: 'flex', columnGap: 10}}>
                <PostContainer />
                <PostContainer2 />
                <CommentsContainer />
            </div>

        </div>
    );
}

export default App;
