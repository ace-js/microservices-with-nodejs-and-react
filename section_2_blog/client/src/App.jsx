import React from 'react';

import PostForm from './PostForm';
import PostList from './PostList';

export default () => (
  <div className="container">
    <PostForm />
    <hr />
    <PostList />
  </div>
);
