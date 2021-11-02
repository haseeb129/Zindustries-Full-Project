import React, { useState, useEffect } from 'react';
import auth from '../../authService';
import axios from '../../../AxiosInstance';
import { useHistory } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = (props) => {
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
								<label style={{ color: 'white' }}>First Name</label>
								<input value={values.firstName} name='firstName' onChange={handleChange} type='text' placeholder='First Name' required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Last Name</label>
								<input value={values.lastName} name='lastName' onChange={handleChange} type='text' placeholder='Last Name' required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Email</label>
								<input value={values.email} name='email' onChange={handleChange} type='text' placeholder='Email' disabled={true} className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Phone Number</label>
								<input value={values.phone} name='phone' onChange={handleChange} type='text' placeholder='Phone' required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Company Name</label>
								<input value={values.companyName} name='companyName' onChange={handleChange} type='text' placeholder='Company Name' required className='input-fild' />
							</div>
							<div style={{ paddingBottom: '0.5rem' }}>
								<label style={{ color: 'white' }}>Ocupation</label>
								<input value={values.ocupation} name='ocupation' onChange={handleChange} type='text' placeholder='Ocupation' required className='input-fild' />
							</div>
							<div className='model-uplod-dv'>
								<button type='submit' className='profile-update-btn'>
									Update Profile
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

export default EditProfile;
