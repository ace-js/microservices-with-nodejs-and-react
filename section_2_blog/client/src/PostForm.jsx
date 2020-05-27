import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);

  const onChangeHandler = ({ target }) => {
    setTitle(target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/posts', { title });
      setTitle('');
    } catch (error) {
      showError();
    }
  };

  const showError = () => {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input type="text" className="form-control" value={title} onChange={onChangeHandler} />
        </div>
        <button className="btn btn-primary">Submit</button>
        { hasError && <div className="alert alert-danger" role="alert">Something went wrong!</div>}
      </form>
    </div>
  );
};
