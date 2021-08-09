/** @format */

import React, { Component } from 'react';
import { ImAttachment } from 'react-icons/im';
import { FiSend } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './chatMassages.css';
import { send_messages, get_messages, delete_message } from '../store/action';
import { connect } from 'react-redux';

class ChatMassages extends Component {
	constructor() {
		super();
		this.state = {
			user_message: '',
		};
	}

	componentDidMount() {
		if (this.props.chat_users_info !== null) {
			this.props.get_messages(
				this.props.chat_users_info,
				this.props.current_user,
			);
		}
	}

	render() {
		let chat_users = this.props.chat_users_info;
		let current_user = this.props.current_user;
		let message = this.state.user_message;
		let messages_uid = this.props.message_uid;
		let get_messages = [];

		for (const property in this.props.messages) {
			get_messages.push(this.props.messages[property]);
		}

		const send_data = () => {
			if (message !== '') {
				this.props.send_messages(chat_users, current_user, message);
				this.setState({
					user_message: '',
				});
				document.getElementById('textbox').innerHTML = '';
			}
		};
		const sendDataKeyPress = (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				send_data();
			}
		};
		const setMessageValue = () => {
			let value = document
				.getElementById('textbox')
				.innerHTML.replace(/<div.*?>.*?<\/div>/gi, '')
				.replace(/<br\s*\/?>/g, '');
			this.setState({
				user_message: value,
			});
		};
		return (
			<>
				{!chat_users && (
					<div className='messages-logo'>
						<div />
					</div>
				)}
				{this.props.chat_users_info && (
					<>
						<div className='chat-users-profile'>
							<img
								className='users-img'
								src={
									chat_users.photo ||
									'https://banner2.cleanpng.com/20180402/ojw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804a62b58.8673620215226654766806.jpg'
								}
								alt='user'
							/>
							<span>{this.props.chat_users_info.name}</span>
						</div>
						<div className='user-input'>
							<IconContext.Provider
								value={{
									size: '23px',
									className: 'attachment-file',
								}}>
								<div className='attachment-file'>
									<ImAttachment />
								</div>
							</IconContext.Provider>
							<div className='text-area'>
								<div
									onKeyPress={sendDataKeyPress}
									onInput={setMessageValue}
									placeholder='type ...'
									id='textbox'
									contentEditable='true'
								/>
							</div>
							<IconContext.Provider
								value={{ size: '23px', className: 'send-msg' }}>
								<div className='send-msg' onClick={send_data}>
									<FiSend />
								</div>
							</IconContext.Provider>
						</div>

						{this.props.messages === null ? (
							<div className='quick-chat'>
								<div />
								<p>
									No chat avilable. Try to Quick Chat Now...
								</p>
							</div>
						) : (
							<div id='messages'>
								{get_messages.reverse().map((chat, index) => {
									return (
										<div
											key={index}
											className={`${
												chat.uid === current_user.uid
													? 'user-msg'
													: 'other-msg'
											}`}>
											<span className='span-msg'>
												{chat.message}
												<div className='msg-time'>
													{chat.time}
												</div>
											</span>

											<IconContext.Provider
												value={{
													size: '25px',
													className:
														'delete-msg-icon',
												}}>
												<span className='delete-msg'>
													<AiOutlineDelete
														onClick={() =>
															this.props.delete_message(
																messages_uid,
																chat.key,
															)
														}
													/>
												</span>
											</IconContext.Provider>
										</div>
									);
								})}
							</div>
						)}
					</>
				)}
			</>
		);
	}
}

const mapStateToProp = (state) => ({
	messages: state.messages,
	chat_users_info: state.chat_users_info,
	current_user: state.current_user,
	message_uid: state.message_uid,
});

const mapDispatchToProp = (dispatch) => ({
	send_messages: (chat_users, current_user, user_message) =>
		dispatch(send_messages(chat_users, current_user, user_message)),

	get_messages: (chat_users, current_user) =>
		dispatch(get_messages(chat_users, current_user)),

	delete_message: (chat_users, current_user, key) =>
		dispatch(delete_message(chat_users, current_user, key)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ChatMassages);
