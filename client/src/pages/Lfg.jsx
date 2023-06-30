import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
    reset
} from '../features/lfg/lfgSlice'
import Spinner from '../components/Spinner'

const Lfg = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, isError, message } = useSelector((state) => state.lfg);
    console.log(posts)
  
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <div>Error: {message}</div>;
    }
  
    return (
      <div>
        <h1>Looking For Group</h1>
        <div className='lfg-buttons'>
          {posts.map((post) => (
            <div key={post._id}>
                <h3>{post.game}</h3>
                <p>{post.notes}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Lfg