/** @format */

import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import {
  facebook_login,
  auth_listener,
  signup_modal,
  chatapp_login
} from '../store/action';
import SignUp from '../component/signUp';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  componentDidMount() {
    this.props.auth_listener(this.props.history);
  }
  render() {
    const handelChangeEmail = (e) => {
      this.setState({
        email: e.target.value
      });
    };
    const handelChangePassword = (e) => {
      this.setState({
        password: e.target.value
      });
    };

    let email = this.state.email;
    let password = this.state.password;

    return (
      <div className='login-container'>
        <header>
          <div className='contant'>
            <h1>Chat App</h1>
            <p>Connect with your friends and the world around you on ChatApp</p>
          </div>
        </header>

        <div className='form-container'>
          <SignUp />
          <div className='loginform position-relative'>
            {!!this.props.error_message && (
              <span className='position-absolute top-0 text-danger pt-1'>
                {this.props.error_message}
              </span>
            )}
            <input
              id='email'
              className='mt-2'
              type='text'
              placeholder='Email address'
              onChange={handelChangeEmail}
              autoComplete='off'></input>
            <input
              id='password'
              type='password'
              placeholder='Password'
              onChange={handelChangePassword}></input>
            <button
              id='login-btn'
              onClick={() => this.props.chatapp_login(email, password)}>
              Login
            </button>
            <button
              id='create-btn'
              onClick={() =>
                this.props.signup_modal(this.props.signup_modal_open)
              }>
              Create New Account
            </button>
            <div className='other-btn'>
              <button
                id='facebook-btn'
                onClick={() => this.props.facebook_login(this.props.history)}>
                Facebook
              </button>
              <button id='google-btn'>Google</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  signup_modal_open: state.signup_modal_open,
  error_message: state.login_error_message
});

const mapDispatchToProp = (dispatch) => ({
  facebook_login: (history) => dispatch(facebook_login(history)),
  auth_listener: (history) => dispatch(auth_listener(history)),
  signup_modal: (isOpen) => dispatch(signup_modal(isOpen)),
  chatapp_login: (email, password) => dispatch(chatapp_login(email, password))
});

export default connect(mapStateToProp, mapDispatchToProp)(Login);
