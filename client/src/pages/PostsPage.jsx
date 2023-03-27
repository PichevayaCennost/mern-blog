import React from 'react'

import axios from '../utils/axios'
import { PostItem } from '../components/PostItem'

const PostsPage = () => {

  const [posts, setPosts] = React.useState([])
  
  const fetchMyPosts = React.useCallback( async () => {
    const {data} = await axios.get('/posts/user/me');
    setPosts(data);
  }, [])

  React.useEffect( () => {
    fetchMyPosts()
  }, [fetchMyPosts])

  return (
    <div className='max-w-[900px] mx-auto py-10'>
    <div className='flex justify-between gap-8'>
      <div className='flex flex-col gap-10 basic-4/5'>
      {posts?.map( (post, index) => <PostItem key={index} post={post}/>)}
      </div>
    </div>
  </div>
  )
}

export default PostsPage