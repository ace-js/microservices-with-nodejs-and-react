import React from 'react';
import PropTypes from 'prop-types';

import CommentCreationForm from '../containers/CommentCreationForm';
import CommentList from './CommentList';

const PostList = ({ doFetch, posts }) => {
  const renderPosts = () => Object.values(posts).map(post => (
    <div
      key={post.id}
      className='card'
      style={{ width: '30%', marginBottom: '20px' }}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreationForm postId={post.id} doFetch={doFetch} />
      </div>
    </div>
  ));

  return (
    <div>
      <h2>Posts</h2>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderPosts()}
      </div>
    </div>
  );
};

PostList.propTypes = {
  doFetch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

export default PostList;
