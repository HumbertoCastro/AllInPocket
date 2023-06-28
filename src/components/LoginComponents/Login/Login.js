import React from 'react';
import PropTypes from 'prop-types';
import "./login.css"


const Login = () => {
  return (
    <div className='login'>
      <h1>
        Welcome to All.io,
      </h1>
      <p>Please, tell us your name</p>
      <div class="form">
        <input class="input" placeholder="your name" required="" type="text" onChange={ () => {} } />
        <span class="input-border"></span>
      </div>
      <p>And your password</p>
      <div class="form">
        <input class="input" placeholder="password" required="" type="password" onChange={ () => {} } />
        <span class="input-border"></span>
      </div>
    </div>
  )
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
