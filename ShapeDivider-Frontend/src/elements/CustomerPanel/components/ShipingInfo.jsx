import React, { useState, useEffect } from 'react';
import auth from '../../authService';
import axios from '../../../AxiosInstance';
import { useHistory } from 'react-router-dom';
import './EditProfile.css';

const ShipingInfo = (props) => {
	const history = useHistory();
	const user = auth.getCurrentUser();
	const [updateResponse, setUpdateResponse] = useState({
		message: '',
		color: '',
	});
	const [values, setValues] = useState({
		...props.user,
	});
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		let id;
		if (history.location.state && history.location.state.id) {
			id = history.location.state.id;
		} else {
			id = auth.getCurrentUser() ? auth.getCurrentUser()._id : null;
		}
		if (id) {
			axios
				.post('auth/getuserById', { id: id })
				.then((user) => {
					setValues(user.data.user);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateResponse({ message: '', color: '' });
		console.log('This is submit State', values);

		await axios
			.patch('auth/updateUserProfile', {
				...values,
			})
			.then((res) => {
				console.log('RES', res);
				setUpdateResponse({ message: 'Update successful', color: 'green' });
			})
			.catch((err) => {
				setUpdateResponse({ message: 'Update failed', color: 'red' });
				console.log('err', err);
			});
	};

	return (
		<div style={{ padding: '5rem 1rem 1rem 1rem' }}>
			<div
				className='d-flex'
				style={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<div style={{ overflow: 'auto' }}>
					<form onSubmit={handleSubmit} style={{ width: '375px' }}>
						<div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Address</label>
								<input value={values.address} name='address' onChange={handleChange} type='text' placeholder='Address' required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Apartment</label>
								<input value={values.aprtment} name='aprtment' type='text' onChange={handleChange} placeholder='Apartment/Suite/Building' required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>City</label>
								<input value={values.city} name='city' type='text' placeholder='City' onChange={handleChange} className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>State</label>
								<input value={values.state} name='state' type='text' placeholder='State' onChange={handleChange} required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Zip Code</label>
								<input value={values.zip} name='zip' type='text' placeholder='Zip Code' onChange={handleChange} required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Country</label>
								<input value={values.country} name='country' type='text' placeholder='Country' onChange={handleChange} required className='input-fild' />
							</div>
							<div className='model-uplod-dv'>
								<button type='submit' className='profile-update-btn'>
									Update Information
								</button>
							</div>
							<p style={{ color: updateResponse.color }}>{updateResponse.message}</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ShipingInfo;
