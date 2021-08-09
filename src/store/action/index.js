/** @format */

import firebase from '../../config/firebase';

//  Authentication Start

// Facebook Login
const facebook_login = (history) => {
	return (dispatch) => {
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */

				// The signed-in user info.
				var user = result.user;
				let create_user = {
					name: user.displayName,
					email: user.email,
					photo: user.photoURL,
					uid: user.uid,
				};
				firebase
					.database()
					.ref('/')
					.child(`users/${user.uid}`)
					.set(create_user);
				history.push('/chat');
			})
			.catch((error) => {
				console.log('Error==>>', error);
			});
	};
};

// Create user account in our app
const create_user = (name, email, password) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				// ...
				user.updateProfile({
					displayName: name,
				});
				let create_user = {
					name,
					email: user.email,
					photo: user.photoURL,
					uid: user.uid,
				};
				firebase
					.database()
					.ref('/')
					.child(`users/${user.uid}`)
					.set(create_user);
				dispatch({ type: 'SIGNUP_MODAL_OPEN', payload: false });
				dispatch({ type: 'SIGNUP_ERROR_MESSAGE', payload: '' });
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				// ..
				dispatch({ type: 'SIGNUP_ERROR_MESSAGE', payload: errorCode });
			});
	};
};

// Login with our app account
const chatapp_login = (email, password) => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				// ...
				dispatch({ type: 'LOGIN_ERROR_MESSAGE', payload: '' });
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				dispatch({ type: 'LOGIN_ERROR_MESSAGE', payload: errorCode });
			});
	};
};

// Get users list from firebase
const get_users = () => {
	return (dispatch) => {
		firebase
			.database()
			.ref('/')
			.child('users')
			.on('value', (data) => {
				dispatch({ type: 'SET_USER', payload: data.val() });
			});
	};
};

// Check user signed in or not
const auth_listener = (history) => {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				// User is signed in.
				let current_user = {
					name: user.displayName,
					email: user.email,
					photo: user.photoURL,
					uid: user.uid,
				};
				dispatch({ type: 'SET_CURRENT_USER', payload: current_user });
				history.push('/chat');
			} else {
				// No user is signed in.
				history.push('/');
			}
		});
	};
};

// User logout
const user_signout = (history) => {
	return (dispatch) => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
				history.push('/');
			})
			.catch((error) => {
				// An error happened.
			});
	};
};

// Authentication End

// SignUp Modal
const signup_modal = (isOpen) => {
	return (dispatch) => {
		dispatch({ type: 'SIGNUP_MODAL_OPEN', payload: !isOpen });
	};
};

// Send message
const send_messages = (user, current_user, user_message) => {
	return (dispatch) => {
		let message_uid;
		if (user.uid > current_user.uid) {
			message_uid = user.uid + current_user.uid;
		} else {
			message_uid = current_user.uid + user.uid;
		}
		let { date, time } = getDateTime();
		let message = {
			key: date,
			uid: current_user.uid,
			time,
			message: user_message,
		};
		firebase
			.database()
			.ref('/')
			.child(`messages/${message_uid}/${date}`)
			.set(message);
	};
};

// Use in send messages
const getDateTime = () => {
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	return {
		date: date.getTime(),
		time: `${hours}:${minutes}`,
	};
};

// Get messages
const get_messages = (user, current_user) => {
	return (dispatch) => {
		let message_uid;
		if (user.uid > current_user.uid) {
			message_uid = user.uid + current_user.uid;
		} else {
			message_uid = current_user.uid + user.uid;
		}
		dispatch({ type: 'SET_MESSAGES_UID', payload: message_uid });
		dispatch({ type: 'CHAT_USERS_INFO', payload: user });

		firebase
			.database()
			.ref('/')
			.child(`messages/${message_uid}`)
			.on(
				'value',
				(data) => {
					if (data.val() !== null) {
						dispatch({ type: 'GET_MESSAGES', payload: data.val() });
					} else {
						dispatch({ type: 'GET_MESSAGES', payload: data.val() });
					}
				},
				(errorObject) => {
					console.log('error to get data', errorObject.name);
				},
			);
	};
};

// Delete Messages
const delete_message = (message_uid, key) => {
	return (dispatch) => {
		firebase
			.database()
			.ref('/')
			.child(`messages/${message_uid}/${key}`)
			.remove()
			.then(() => {
				// Successfully delele msg
			})
			.catch(() => {
				// Handle if any error
			});
	};
};

// Canvas Users List
const canvas_open = (value) => {
	return (dispatch) => {
		dispatch({ type: 'CANVAS_OPEN', payload: !value });
	};
};

export {
	facebook_login,
	auth_listener,
	user_signout,
	get_users,
	send_messages,
	get_messages,
	delete_message,
	canvas_open,
	create_user,
	signup_modal,
	chatapp_login,
};
