import React, { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
import ErrorAlert from '../../components/error-alert';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, reset, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password }
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await doRequest();

    if (response.success) Router.push('/');
  };

  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='text'
            name='email'
            id='email'
            className='form-control'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-control'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign up
        </button>
      </form>
      <br />
      <ErrorAlert errors={errors} close={reset} />
    </div>
  );
};
