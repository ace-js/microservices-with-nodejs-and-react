import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PostCreationForm = ({ doFetch }) => {
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);

  const onChangeHandler = ({ target }) => {
    setTitle(target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        await axios.post('http://my-blog.io/posts/create', { title });
        setTitle('');
        doFetch();
      } catch (error) {
        showError();
      }
    }
  };

  const showError = () => {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="post">Title</label>
          <input
            type="text"
            name="post"
            className="form-control"
            value={title}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {hasError && <div className="alert alert-danger" role="alert">Something went wrong!</div>}
      </form>
    </div>
  );
};

PostCreationForm.propTypes = {
  doFetch: PropTypes.func.isRequired
};

export default PostCreationForm;
