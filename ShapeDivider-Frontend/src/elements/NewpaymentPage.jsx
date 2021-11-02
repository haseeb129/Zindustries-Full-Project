import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import axios from '../AxiosInstance';
import './NewpaymentPage.css';
import { Form, FormGroup, Input } from 'reactstrap';
import { SelectMonths, SelectYear, SelectPlan } from '../elements/constant';
import logicn from '../Assets/images/logo/logow.png';
import creditCard from '../Assets/images/logo/basicCreditCard.png';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';

export class NewpaymentPage extends Component {
	state = {
		value: '',
		cvc: '458',
		cardNumber: '4242424242424242',
		selectedPlan: 'Monthly',
		expYear: null,
		expMonth: null,
	};

	componentDidMount() {
		const userObject = JSON.parse(localStorage.getItem('userObject'));
		if (userObject) {
			this.setState({ userObject });
		} else {
			window.location = '/';
		}
	}

	handleChange = (event) => {
		this.setState({ selectedPlan: event.target.value }, () => {
			console.log(this.state.selectedPlan);
		});
	};

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		let { expYear, expMonth, selectedPlan, cardNumber } = this.state;
		cardNumber = cardNumber.split(' ').join('');
		console.log('Values', expYear, expMonth, selectedPlan);
		if (expYear !== null && expYear !== 'Select Year' && expMonth !== null && expMonth !== 'Select Month' && selectedPlan !== null && selectedPlan !== 'Select Plan') {
			this.setState({ selectionError: null });
			this.setState({ responseError: null });
			console.log('This is submit state', this.state);
			axios
				.post('payment/addStripeSubscription', this.state)
				.then((res) => {
					console.log('Response Sign Up', res);
					localStorage.removeItem('userObject');
					localStorage.setItem('token', res.data.token);
					window.location = '/';
				})
				.catch((err) => {
					console.log('Error sign up', err.response);

					let msg = err.response ? (err.response.data ? err.response.data.message : 'Error Occur') : 'Error Occur';
					this.setState({ responseError: msg });
				});
		} else {
			console.log('Submit Else Block');
			let message = expMonth === null || expMonth === 'Select Month' ? 'Select Month' : expYear === null || expYear === 'Select Year' ? 'Select Year' : selectedPlan === null || selectedPlan === 'Select Plan' ? 'Select Plan' : 'Error';
			this.setState({ selectionError: message });
		}
		this.setState({ responseError: null });
	};

	//style={{ textAlign: "-webkit-center" }}
	render() {
		return (
			<div style={{ height: '100vh' }}>
				<div className='payment-page-wraper'>
					<div>
						<div style={{ paddingBottom: '2rem' }}>
							<Link to='/'>
								<img src={logicn} alt='' style={{ width: '230px' }} />
							</Link>
						</div>
						<div>
							<h4 className='start-design-hd'>Start Designing today</h4>
							<p className='choose-pln-p'>Choose Monthly, Six Months or Yearly plan.</p>
						</div>
						<div className='height-equal'>
							<form onSubmit={this.handleSubmit} style={{ width: '355px' }}>
								<div style={{ marginBottom: '1rem' }} className='d-flex justify-content-between'>
									<div className='d-flex justify-content-between pick-plan-dv'>
										<div>
											<p className='plan-Name'>Monthly</p>
											<p className='plan-price'>$10.69</p>
										</div>
										<div>
											<Radio checked={this.state.selectedPlan === 'Monthly'} onChange={this.handleChange} value='Monthly' name='radio-bttn-plan' style={{ color: '#ff5900' }} />
										</div>
									</div>
									<div className='d-flex justify-content-between pick-plan-dv'>
										<div>
											<p className='plan-Name'>Six Months</p>
											<p className='plan-price'>$60.98</p>
										</div>
										<div>
											<Radio checked={this.state.selectedPlan === 'Six Months'} onChange={this.handleChange} value='Six Months' name='radio-bttn-plan' style={{ color: '#ff5900' }} />
										</div>
									</div>
									<div className='d-flex justify-content-between pick-plan-dv'>
										<div>
											<p className='plan-Name'>Yearly</p>
											<p className='plan-price'>$106.99</p>
										</div>
										<div>
											<Radio checked={this.state.selectedPlan === 'Yearly'} onChange={this.handleChange} value='Yearly' name='radio-bttn-plan' style={{ color: '#ff5900' }} />
										</div>
									</div>
								</div>

								{this.state.userObject && (
									<FormGroup style={{ padding: 0 }} className='col-12 p-r-0'>
										<Input disabled={true} className='payment-inpt' type='text' placeholder='Full name' value={this.state.userObject.firstName + ' ' + this.state.userObject.lastName} />
									</FormGroup>
								)}
								{this.state.userObject && (
									<FormGroup style={{ padding: 0 }} className='col-12'>
										<Input disabled={true} className='payment-inpt' type='text' placeholder='Email' value={this.state.userObject.email} />
									</FormGroup>
								)}
								<label className='label-design'>CARD NUMBER</label>
								<div style={{ position: 'relative' }}>
									<NumberFormat required customInput={Form.Control} format='#### #### #### ####' name='cardNumber' className='payment-inpt' placeholder='Card Number' value={this.state.cardNumber} onChange={this.handleInputChange} style={{}} />
									<img
										src={creditCard}
										alt='something'
										style={{
											width: '42px',
											height: '42px',
											position: 'absolute',
											right: '7px',
										}}
									/>
								</div>

								<div className='d-flex justify-content-between'>
									<div style={{ width: '49%' }}>
										<label className='label-design'>SECURITY CODE</label>
										<NumberFormat required customInput={Form.Control} format='###' name='cvc' className='payment-inpt' placeholder='CVC' value={this.state.cvc} onChange={this.handleInputChange} />
									</div>
									{/* <div style={{ width: '49%' }}>
                    <label className="label-design">SUBSCRIPTION PLAN</label>
                    <select
                      className="payment-inpt-subscritn"
                      size="1"
                      name="selectedPlan"
                      onChange={this.handleInputChange}
                    >
                      {SelectPlan.map((plan, i) => (
                        <option key={i}>{plan}</option>
                      ))}
                    </select>
                  </div> */}
								</div>

								<label className='label-design'>EXPIRATION DATE</label>
								<div className='d-flex justify-content-between'>
									<select className='expiration-inpt' size='1' name='expMonth' onChange={this.handleInputChange}>
										{SelectMonths.map((months, i) => (
											<option key={i}>{months}</option>
										))}
									</select>
									<select
										name='expYear'
										className='expiration-inpt'
										size='1'
										onChange={this.handleInputChange}
										// onSelect={(e) => {
										//   console.log("onSelect", e);
										// }}
									>
										{SelectYear.map((years, i) => (
											<option key={i}>{years}</option>
										))}
									</select>
								</div>

								{this.state.selectionError && <p className='alertTextSelection'>{this.state.selectionError}</p>}
								{this.state.responseError && <p className='alertTextSelection'>{this.state.responseError}</p>}

								<div className='subscribe-btn-dv'>
									<div className='subscribe-trms-cntnt'>
										By clicking "Agree & Subscribe," you agree with our subscriber agreement, enrolling in automatic payments that will continue until you cancel. Purchases are final and nonrefundable. You can cancel at any time, effective at the end of the billing period.
									</div>
									<button className='btn-block'>AGREE & SUBSCRIBE</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NewpaymentPage;
