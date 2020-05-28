import React from 'react';
import PropTypes from 'prop-types';

const CommentList = ({ comments }) => {
  const getContent = (comment) => {
    switch (comment.status) {
      case 'approved':
        return comment.content;
      
      case 'rejected':
        return 'This comment has ben rejected';
      
      case 'pending':
      default:
        return 'This comment is awaiting moderation';
    }
  };

  const renderComments = () => comments.map(comment => <li key={comment.id}>{getContent(comment)}</li>);

  return (
    <div>
      <p>Comments ({comments.length})</p>
      <ul>
        {renderComments()}
      </ul>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentList;
