/** @format */

import React, { Component } from 'react';
import Loading from './Loading';
import { get_users, get_messages } from '../store/action';
import './chatUser.css';
import { connect } from 'react-redux';

class ChatUsers extends Component {
  componentDidMount() {
    this.props.get_users();
  }

  render() {
    let current_user = this.props.current_user;
    let firebase_users = [];

    for (const property in this.props.users) {
      firebase_users.push(this.props.users[property]);
    }

    return (
      <>
        {!firebase_users.length && (
          <div>
            <Loading />
          </div>
        )}

        {firebase_users.length === 1 ? (
          <h3 className='no-users'>Sorry! No Users Available</h3>
        ) : (
          <ul className='p-0'>
            {firebase_users.map((user, index) => {
              return (
                current_user.uid !== user.uid && (
                  <li
                    key={index}
                    className='users'
                    onClick={() => {
                      this.props.get_messages(user, current_user);
                    }}>
                    <img
                      className='users-img'
                      src={
                        user.photo ||
                        'https://banner2.cleanpng.com/20180402/ojw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804a62b58.8673620215226654766806.jpg'
                      }
                      alt='user'
                    />
                    <span className='user-name'>{user.name}</span>
                  </li>
                )
              );
            })}
          </ul>
        )}
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  users: state.users,
  current_user: state.current_user
});

const mapDispatchToProp = (dispatch) => ({
  get_users: () => dispatch(get_users()),
  get_messages: (user, current_user) =>
    dispatch(get_messages(user, current_user))
});

export default connect(mapStateToProp, mapDispatchToProp)(ChatUsers);
