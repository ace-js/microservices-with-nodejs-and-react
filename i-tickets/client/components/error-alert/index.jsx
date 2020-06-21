import React from 'react';
import PropTypes from 'prop-types'

const ErrorAlert = ({ errors = [], close }) => {
  return errors.length ? (
    <div className='alert alert-danger alert-dismissible'>
      <button className='close' data-dismiss='alert' onClick={close}>
        &times;
      </button>
      <h4>Ooops..</h4>
      <ul>
        {errors.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

ErrorAlert.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired
    })
  ).isRequired,
  close: PropTypes.func.isRequired
}
export default  ErrorAlert;