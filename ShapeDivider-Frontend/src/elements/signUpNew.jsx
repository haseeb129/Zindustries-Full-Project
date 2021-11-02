import React, { Component } from 'react';
import './signUpNew.css';
import logicn from '../Assets/images/logo/logow.png';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Gmail from './Gmail';
import { Divider } from 'antd';
import axios from '../AxiosInstance';

export class signUpNew extends Component {
	state = {
		firstName: '',
		lastName: '',
		companyName: '',
		email: '',

		alert: 'Password not match',
		password: null,
		secondPassword: null,

		detailsPart: true,
		emailPart: false,
		passwordPart: false,
	};

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmitdetailsPart = (e) => {
		e.preventDefault();
		this.setState({ detailsPart: false, emailPart: true, passwordPart: false });

		// this.setState({ detailsPart: false, emailPart: true, passwordPart: false })
		// this.setState({ responseError: null })
		// console.log('This is submit State', this.state)
		// if (this.state.password === this.state.secondPassword) {
		//   axios
		//     .post('auth/signup', this.state)
		//     .then((res) => {
		//       console.log('Response Sign Up', res)
		//       localStorage.setItem(
		//         'userObject',
		//         JSON.stringify(res.data.userObject),
		//       )
		//       window.location = '/new'
		//     })
		//     .catch((err) => {
		//       console.log('Error sign up', err.response)

		//       this.setState({ responseError: err.response.data.message })
		//     })
		// } else {
		//   this.setState({ alert: 'Password not match' })
		// }
	};

	handleSubmitemailPart = (e) => {
		e.preventDefault();

		this.setState({ detailsPart: false, emailPart: false, passwordPart: true });
	};

	handleSubmitpasswordPart = (e) => {
		e.preventDefault();

		if (this.state.password === this.state.secondPassword) {
			axios
				.post('auth/signup', this.state)
				.then((res) => {
					console.log('Response Sign Up', res);
					localStorage.setItem('userObject', JSON.stringify(res.data.userObject));
					window.location = '/new';
				})
				.catch((err) => {
					console.log('Error sign up', err.response);

					this.setState({ responseError: err.response.data.message });
				});
		} else {
			this.setState({ alert: 'Password not match' });
		}
	};

	render() {
		return (
			<div>
				<div
					className='row justify-content-center'
					style={{
						height: '100vh',
						backgroundColor: '#25303c',
						paddingTop: '8rem',
					}}>
					{this.state.detailsPart && (
						<div className='details-dv'>
							<div className='login_icon-signup text-center'>
								<img src={logicn} alt='' style={{ width: '230px' }} />
							</div>
							<div>
								<text className='step-nbr'>STEP 1 of 3</text>
							</div>
							{/* <div className="login-wgogle">
              <Gmail />
            </div>
            <div className="card-break-d">
              <Divider style={{ color: '#9c99b6', fontSize: '15px' }}>
                or
              </Divider>
            </div> */}
							<div>
								<p className='signup-guid'>Enter your Details</p>
							</div>
							<form className='signup-frm' onSubmit={this.handleSubmitdetailsPart}>
								<div className='flname d-flex justify-content-between p-0'>
									<input required id='outlined-fname-input' placeholder='First Name' type='text' name='firstName' autoComplete='current-fname' className='firstName-field ' onChange={this.handleInputChange} />
									<input required id='outlined-lname-input' name='lastName' placeholder='Last Name' type='text' autoComplete='current-lname' className='firstName-field' onChange={this.handleInputChange} />
								</div>
								<input required id='outlined-companyname-input' placeholder='Company Name' name='companyName' type='text' autoComplete='current-companyname' className='company-field' onChange={this.handleInputChange} />

								<div className='agree-continu'>
									<div className='accept-terms-txt'>
										Z Industries will use your data to personalize and improve your experience and to provide you information about Z Industries. You can change your preferences anytime. We may use your data as described in our <u className='pripolicy-lnk'>Privacy Policy</u>.
									</div>
									<input type='Submit' value='AGREE & CONTINUE' className='agre-conti' />
								</div>
							</form>
						</div>
					)}
					{this.state.emailPart && (
						<div className='email-dv'>
							<div className='login_icon text-center'>
								<img src={logicn} alt='' style={{ width: '230px' }} />
							</div>
							<div>
								<text className='step-nbr'>STEP 2 of 3</text>
							</div>
							{/* <div className="login-wgogle">
             
              <Gmail />
            </div>
            <div className="card-break-d">
              <Divider style={{ color: '#9c99b6', fontSize: '15px' }}>
                or
              </Divider>
            </div> */}
							<div>
								<p className='signup-guid'>Enter your email</p>
							</div>
							<form className='signup-frm' onSubmit={this.handleSubmitemailPart}>
								<input required id='outlined-email-input' placeholder='Email' type='email' name='email' style={{ color: '#fff' }} autoComplete='current-email' className='emailsignup-field' onChange={this.handleInputChange} />

								<FormControlLabel
									control={
										<Checkbox
											reguired
											checked={this.state.privacyPolicy}
											onChange={() => {
												let { privacyPolicy } = this.state;
												this.setState({ privacyPolicy: !privacyPolicy });
											}}
											name='checkedB'
											style={{ color: '#f16219' }}
										/>
									}
									label={
										<span className='term-to-accpt'>
											I agree to the
											<Link>
												<u style={{ fontWeight: '600' }} className='policy-lnk'>
													Privacy Policy
												</u>
											</Link>
										</span>
									}
									style={{ marginBottom: '-1rem' }}
								/>
								<div className='agree-continu'>
									<div className='accept-terms-txt'>
										Z Industries will use your data to personalize and improve your experience and to provide you information about Z Industries. You can change your preferences anytime. We may use your data as described in our <u className='pripolicy-lnk'>Privacy Policy</u>.
									</div>
									<input type='Submit' value='AGREE & CONTINUE' className='agre-conti' />
								</div>
							</form>
						</div>
					)}

					{this.state.passwordPart && (
						<div className='password-dv'>
							{this.state.responseError && (
								<p className='alertTextSelection' style={{ textAlign: 'center' }}>
									{this.state.responseError}
								</p>
							)}
							<div className='login_icon text-center'>
								<img src={logicn} alt='' style={{ width: '230px' }} />
							</div>
							<div>
								<text className='step-nbr'>STEP 3 of 3</text>
							</div>
							{/* <div className="login-wgogle">
             
              <Gmail />
            </div>
            <div className="card-break-d">
              <Divider style={{ color: '#9c99b6', fontSize: '15px' }}>
                or
              </Divider>
            </div> */}
							<div>
								<p className='signup-guid'>Enter your password</p>
							</div>
							<form className='signup-frm' onSubmit={this.handleSubmitpasswordPart}>
								<input required id='outlined-password-input' placeholder='Password' type='password' name='password' autoComplete='current-password' className='passwordsignup-field' onChange={this.handleInputChange} />
								{/* <div style={{ height: "15px" }}></div> */}
								<input required id='outlined-confirmpassword-input' placeholder='Confirm Password' type='password' name='secondPassword' autoComplete='current-password' className='passwordsignup-field' onChange={this.handleInputChange} />

								<div className='agree-continu-signup'>
									<div className='accept-terms-txt'>
										Z Industries will use your data to personalize and improve your experience and to provide you information about Z Industries. You can change your preferences anytime. We may use your data as described in our <u className='pripolicy-lnk'>Privacy Policy</u>.
									</div>
									<input type='Submit' value='AGREE & CONTINUE' className='agre-conti' />
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default signUpNew;
