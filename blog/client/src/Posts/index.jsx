import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostCreationForm from './containers/PostCreationForm';
import PostList from './components/PostList';

export default () => {
  const [posts, setPosts] = useState({});

const fetchPosts = async () => {
  const res = await axios.get('http://my-blog.io/posts');

  setPosts(res.data);
};

useEffect(() => {
  fetchPosts();
}, []);

return (
  <div>
    <PostCreationForm  doFetch={fetchPosts}/>
    <hr />
    <PostList doFetch={fetchPosts} posts={posts} />
  </div>
)
}