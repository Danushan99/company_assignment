/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import axiosCancel from 'axios-cancel';
import { toast } from 'react-toastify';

axiosCancel(axios, {
	debug: false // default
});

let cancelRequests = [];

export function cancelLoginServiceCall() {
	if (cancelRequests.length > 0) {
		cancelRequests.forEach(element => {
			element.cancel();
		});

		cancelRequests = [];
	}
}

const apiUrl = process.env.REACT_APP_API_URL;
// console.log('🚀 ~ file: jwtService.js ~ line 25 ~ apiUrl', apiUrl);

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					// console.log('err.response',err.response)
					if (err.response.status === 403 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);

						/* redirect to login */
						const base_url = window.location.origin;
						const curret_path = window.location.pathname;
						if (curret_path !== '/login') {
							window.location.replace(`${base_url}/login`);
						}
					} else if (err.response.status === 400 && err.response.data.Msg !== 'Unathorization Request') {
						toast.error(err.response.data.Msg, {
							position: toast.POSITION.TOP_CENTER,
							autoClose: 400
						});
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'Session expired login Again..');
			//  this.emit('onAutoLogout');
			// this.autoLogoutRedirection();
			// toast.error('Access_token expired', { position: toast.POSITION.TOP_CENTER, autoClose: 4000 });
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post(`${apiUrl}/user`, data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth', {
					data: {
						email,
						password
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		const data = {};

		return new Promise((resolve, reject) => {
			axios
				.get(`${apiUrl}/refresh`, {
					headers: { tokensapi: this.getAccessToken() }
				})
				.then(response => {
					if (response.status === 200) {
						this.setSession(response.data.apkrefreshtokens);
						this.setRefreshToken(response.data.apkrefreshtokens);

						const user = {
							data: this.extractUserFromToken(),
							role: this.extractUserRoleFromToken()
						};

						resolve(user);
					} else {
						toast.error('Failed to login with token.', {
							position: toast.POSITION.TOP_CENTER,
							autoClose: 4000
						});
						this.logout();
						// reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					toast.error('Failed to login with token.', {
						position: toast.POSITION.TOP_CENTER,
						autoClose: 4000
					});
					this.logout();
					// reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			
			axios.defaults.headers.common['tokensapi'] = `${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common['tokensapi'];
		}
	};

	extractUserRoleFromToken = () => {
		const access_token = this.getAccessToken();

		const decoded = jwtDecode(access_token);
		
		return ['admin']; // decoded.roles;
	};

	extractUserFromToken = () => {
		const access_token = this.getAccessToken();

		const decoded = jwtDecode(access_token);

		const data = {
			displayName: decoded.UserName, // 'John Doe',
			photoURL: 'assets/images/avatars/Velazquez.jpg',
			email: decoded.email ? decoded.email : '',
			
			userId: decoded.UserID,
			role: this.extractUserRoleFromToken()
		};

		return data;
	};

	userLogin = userData => {
		const ourRequest = axios.CancelToken.source();
		cancelRequests.push(ourRequest);

		return new Promise((resolve, reject) => {
			axios
				.post(`${apiUrl}/user/login`, userData, {
					cancelToken: ourRequest.token
				})
				.then(response => {
					if (response && response.status === 200) {
						this.setSession(response.data.apktokens);
						this.setRefreshToken(response.data.apktokens);

						const user = {
							data: this.extractUserFromToken(),
							role: this.extractUserRoleFromToken()
							
						};

						resolve(user);
					}
				})
				.catch(err => {
					reject(err);
				});
		});
	};

	
	setRefreshToken = refresh_token => {
		if (refresh_token) {
			localStorage.setItem('jwt_refresh_token', refresh_token);
		} else {
			localStorage.removeItem('jwt_refresh_token');
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			// console.warn('access token expired');

			/* redirect to login */
			const base_url = window.location.origin;
			const curret_path = window.location.pathname;

			if (curret_path !== '/login') {
				window.location.replace(`${base_url}/login`);
			}

			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};

	getRefreshToken = () => {
		return window.localStorage.getItem('jwt_refresh_token');
	};

	autoLogoutRedirection = () => {
		/* redirect to login */
		const base_url = window.location.origin;
		const curret_path = window.location.pathname;
		// console.log('token expired-base_url', base_url)
		// console.log('token expired-curret_path', curret_path)
		if (curret_path !== '/login') {
			window.location.replace(`${base_url}/login`);
		}
	};
}

const instance = new JwtService();

export default instance;
