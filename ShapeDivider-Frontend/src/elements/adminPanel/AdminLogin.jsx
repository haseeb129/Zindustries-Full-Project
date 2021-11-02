import React, { Component } from 'react';
import './Adminlogin.css';
import logicn from '../../Assets/images/logo/logow.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from '../../AxiosInstance';
import auth from '../authService';
import { withRouter } from 'react-router-dom';
export class Login extends Component {
	state = {
		email: '',
		password: '',
	};
	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentDidMount() {
		const user = auth.getCurrentUser();
		console.log(user);
		if (user) {
			this.props.history.push('/adminpanel');
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('State', this.state);
		this.setState({ responseError: null });
		console.log('This is submit State', this.state);

		axios
			.post('admin/login', this.state)
			.then((res) => {
				console.log('Response Sign In', res);
				localStorage.setItem('adminToken', res.data.token);
				window.location = '/adminpanel';
			})
			.catch((err) => {
				console.log('Error sign In', err.response);
				this.setState({ responseError: err.response.data.message });
			});
	};

	render() {
		return (
			<div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundColor: '#25303c' }}>
				<div className='login-wraper '>
					<div className='container text-center ptb--50 form-contain'>
						<div className='login_icon'>
							<Link to='/'>
								<img src={logicn} alt='' style={{ width: '230px' }} />
							</Link>
						</div>

						<div style={{ height: '15px' }}></div>
						<p style={{ height: '35px', color: 'white' }}>Admin Login</p>

						<form onSubmit={this.handleSubmit} style={{ width: '375px' }}>
							<input required id='outlined-email-input' label='Email' type='email' name='email' placeholder='Email' autoComplete='current-email' variant='outlined' className='admin-field' onChange={this.handleInputChange} />
							<br />
							<div style={{ height: '15px' }}></div>
							<input required id='outlined-password-input' label='Password' name='password' type='password' placeholder='Password' autoComplete='current-password' variant='outlined' className='admin-field' onChange={this.handleInputChange} />
							<div style={{ height: '15px' }}></div>
							<div className='d-flex justify-content-between'>
								<button variant='contained' color='Primary' className='admin-lg-btn' type='submit'>
									Log in
								</button>
							</div>

							{this.state.responseError && <p className='alertText'>{this.state.responseError}</p>}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
