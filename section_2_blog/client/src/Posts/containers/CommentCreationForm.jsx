import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CommentCreationForm = ({ postId, doFetch }) => {
  const [content, setContent] = useState('');

  const onChangeHandler = ({ target }) => {
    setContent(target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (content) {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
      setContent('');
      doFetch();
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="comment">New Comment</label>
        <input
          type="text"
          name="comment"
          className="form-control"
          value={content}
          onChange={onChangeHandler}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
};

CommentCreationForm.propTypes = {
  postId: PropTypes.string.isRequired,
  doFetch: PropTypes.func.isRequired
};

export default CommentCreationForm;
