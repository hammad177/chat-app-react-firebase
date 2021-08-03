/** @format */

import React, { Component } from 'react';
import Modal from 'react-modal';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';
import { signup_modal, create_user } from '../store/action';

Modal.setAppElement('#root');

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      checkName: {
        nameIsValid: false,
        message: '',
        style: ''
      },
      checkEmail: {
        emailIsValid: false,
        message: '',
        style: ''
      },
      checkPassword: {
        passwordIsValid: false,
        message: '',
        style: ''
      },
      isFormFilled: true,
      name: '',
      email: '',
      password: ''
    };
  }
  render() {
    const Submit = (e) => {
      e.preventDefault();
      const arr = this.state.name.split(' ');
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      let name = arr.join(' ');
      let email = this.state.email + '@chat.com';
      let password = this.state.password;

      let verifyName = this.state.checkName.nameIsValid;
      let verifyEmail = this.state.checkEmail.emailIsValid;
      let verifyPassword = this.state.checkPassword.passwordIsValid;

      if (verifyEmail && verifyPassword && verifyName) {
        this.props.create_user(name, email, password);
        if (this.props.signup_error_message) {
          this.setState({
            name: '',
            password: '',
            email: ''
          });
        }
      } else {
        this.setState({ isFormFilled: false });
      }
    };

    const handelName = (e) => {
      const value = e.target.value;
      const regMatch = /^[a-zA-Z]*$/.test(value);
      const space = /\s/.test(value);
      if (regMatch || space) {
        this.setState({ name: e.target.value });
      }
      if (e.target.value === '') {
        this.setState({
          checkName: {
            nameIsValid: false,
            message: 'Cannot be empty',
            style: 'border border-danger'
          }
        });
      } else {
        this.setState({
          checkName: { nameIsValid: true, message: '', style: '' }
        });
      }
      this.setState({ isFormFilled: true });
    };

    const handelEmail = (e) => {
      this.setState({ email: e.target.value });
      if (e.target.value.includes('@')) {
        this.setState({
          checkEmail: {
            emailIsValid: false,
            message: `Cannot put '@' at email`,
            style: 'border border-danger'
          }
        });
      } else if (e.target.value === '') {
        this.setState({
          checkEmail: {
            emailIsValid: false,
            message: 'Cannot be empty',
            style: 'border border-danger'
          }
        });
      } else {
        this.setState({
          checkEmail: { emailIsValid: true, message: '', style: '' }
        });
      }
      this.setState({ isFormFilled: true });
    };

    const handelPassword = (e) => {
      this.setState({ password: e.target.value });
      if (e.target.value.length < 6) {
        this.setState({
          checkPassword: {
            passwordIsValid: false,
            message: 'Password atleast 6 characters',
            style: 'border border-danger'
          }
        });
      } else if (e.target.value.length > 20) {
        this.setState({
          checkPassword: {
            passwordIsValid: false,
            message: 'Password must under 20 characters',
            style: 'border border-danger'
          }
        });
      } else {
        this.setState({
          checkPassword: { passwordIsValid: true, message: '', style: '' }
        });
      }
      this.setState({ isFormFilled: true });
    };
    return (
      <Modal
        id='signup-modal'
        isOpen={this.props.isOpen}
        onRequestClose={() => this.props.signup_modal(this.props.isOpen)}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.4)' },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}>
        <IconContext.Provider
          value={{ size: '23px', className: 'close-modal-btn' }}>
          <AiOutlineClose
            onClick={() => this.props.signup_modal(this.props.isOpen)}
          />
        </IconContext.Provider>
        <form onSubmit={Submit}>
          <h1>Sign up form</h1>
          <div className='signup-form position-relative'>
            {!this.state.isFormFilled ? (
              <span className='position-absolute top-0 text-danger'>
                fill form completely first
              </span>
            ) : (
              ''
            )}
            {/* Display Name */}
            <div className='input-group position-relative'>
              {!this.state.checkName.nameIsValid && (
                <span className='warning-msg'>
                  {this.state.checkName.message}
                </span>
              )}
              <span className='input-group-text'>Full name</span>
              <input
                type='text'
                value={this.state.name}
                className={`form-control ${
                  !this.state.checkName.nameIsValid
                    ? `${this.state.checkName.style}`
                    : ''
                }`}
                placeholder='Display Name'
                onChange={handelName}
              />
            </div>
            {/* Email */}
            <div className='input-group position-relative'>
              {!!this.props.signup_error_message && (
                <span className='warning-msg-2'>
                  {this.props.signup_error_message}
                </span>
              )}
              {!this.state.checkEmail.emailIsValid && (
                <span className='warning-msg'>
                  {this.state.checkEmail.message}
                </span>
              )}
              <input
                type='text'
                value={this.state.email}
                className={`form-control ${
                  !this.state.checkEmail.emailIsValid
                    ? `${this.state.checkEmail.style}`
                    : ''
                }`}
                placeholder='user name'
                onChange={handelEmail}
              />
              <span className='input-group-text'>@chat.com</span>
            </div>
            {/* Password */}
            <div className='input-group position-relative'>
              {!this.state.checkPassword.passwordIsValid && (
                <span className='warning-msg'>
                  {this.state.checkPassword.message}
                </span>
              )}
              <span className='input-group-text'>Password</span>
              <input
                type='password'
                value={this.state.password}
                placeholder='password'
                className={`form-control ${
                  !this.state.checkPassword.passwordIsValid
                    ? `${this.state.checkPassword.style}`
                    : ''
                }`}
                onChange={handelPassword}
              />
            </div>
            <button
              className='w-50 btn btn-success'
              style={{ cursor: 'pointer' }}>
              Sign Up & Login
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProp = (state) => ({
  isOpen: state.signup_modal_open,
  signup_error_message: state.signup_error_message
});

const mapDispatchToProp = (dispatch) => ({
  signup_modal: (isOpen) => dispatch(signup_modal(isOpen)),
  create_user: (name, email, password) =>
    dispatch(create_user(name, email, password))
});

export default connect(mapStateToProp, mapDispatchToProp)(SignUp);
