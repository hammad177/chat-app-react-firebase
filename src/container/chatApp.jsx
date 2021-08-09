/** @format */

import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { RiUserShared2Line } from 'react-icons/ri';
import ChatUsers from '../component/chatUser';
import ChatMassages from '../component/chatMassages';
import { user_signout, auth_listener, canvas_open } from '../store/action';
import './chatApp.css';
import { connect } from 'react-redux';
import CanvasUser from '../component/canvasUser';

class ChatApp extends Component {
	componentDidMount() {
		this.props.auth_listener(this.props.history);
	}

	render() {
		return (
			<div className='chat-container'>
				<div id='background-color'>
					<div id='chat'>
						<div id='chat-header'>
							<IconContext.Provider
								value={{
									color: '#015e4d',
									size: '24px',
									style: { cursor: 'pointer' },
								}}>
								<div
									className='search-user'
									style={{ marginLeft: '20px' }}>
									<BsSearch />
								</div>
								<div className='canvas-users'>
									<RiUserShared2Line
										onClick={() =>
											this.props.canvas_open(
												this.props.canvas_value,
											)
										}
									/>
									<CanvasUser />
								</div>
							</IconContext.Provider>
							<div className='chat-head'>
								<h1 className='m-0'>Messenger</h1>
							</div>
							<div className='logout-btn'>
								<button
									onClick={() =>
										this.props.user_signout(
											this.props.history,
										)
									}>
									LOGOUT
								</button>
							</div>
						</div>
						<div id='chat-users'>
							<ChatUsers />
						</div>
						<div id='chat-massages'>
							<ChatMassages />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProp = (state) => ({
	canvas_value: state.canvas_open,
});

const mapDispatchToProp = (dispatch) => ({
	user_signout: (history) => dispatch(user_signout(history)),
	auth_listener: (history) => dispatch(auth_listener(history)),
	canvas_open: (value) => dispatch(canvas_open(value)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ChatApp);
