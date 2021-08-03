/** @format */
import { Offcanvas } from 'react-bootstrap';
import { Component } from 'react';
import UserDeafultImg from './user-default-img.jpg';
import { connect } from 'react-redux';
import { canvas_open, get_users, get_messages } from '../store/action';

class CanvasUser extends Component {
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
        <Offcanvas
          show={this.props.canvas_value}
          onHide={() => this.props.canvas_open(this.props.canvas_value)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Chat Users</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
                          this.props.canvas_open(this.props.canvas_value);
                        }}>
                        <img src={user.photo || UserDeafultImg} alt='user' />
                        <span className='user-name'>{user.name}</span>
                      </li>
                    )
                  );
                })}
              </ul>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  users: state.users,
  current_user: state.current_user,
  canvas_value: state.canvas_open
});

const mapDispatchToProp = (dispatch) => ({
  get_users: () => dispatch(get_users()),
  canvas_open: (value) => dispatch(canvas_open(value)),
  get_messages: (user, current_user) =>
    dispatch(get_messages(user, current_user))
});

export default connect(mapStateToProp, mapDispatchToProp)(CanvasUser);
