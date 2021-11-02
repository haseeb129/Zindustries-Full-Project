import React, { useState, useEffect } from 'react';
import axios from '../../../AxiosInstance';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import './Profile.css';

export default function Profile() {
	const [userList, setUserList] = useState([]);
	const [searchItem, setSearchItem] = useState([]);
	const handleSearch = (e) => {
		setSearchItem(e.target.value);
		console.log(('SearchItem:', searchItem));
	};

	const getUsers = () => {
		axios
			.get('auth/getAllUsers')
			.then((res) => {
				console.log('Response', res.data);
				setUserList(res.data.users);
			})
			.catch((err) => {
				console.log('Response', err.response);
			});
	};
	useEffect(() => {
		console.log('AAAAAAAA');
		getUsers();
	}, []);

	const cancelSubscription = async (data) => {
		await axios
			.post('admin/cancelSubscription', {
				userId: data._id,
			})
			.then((res) => {
				getUsers();
			})
			.catch((err) => {
				alert('ERROR : Subscription not canceled');
			});
	};

	const deleteAndRefund = async (data) => {
		const originalState = userList;
		const temp = userList.filter((c) => c._id !== data._id);
		setUserList(temp);

		await axios
			.post('admin/deleteAndRefund', {
				userId: data._id,
			})
			.then((res) => {})
			.catch((err) => {
				alert('ERROR : User Not Deleted');
				setUserList(originalState);
			});
	};

	return (
		<div style={{ padding: '5rem 1rem 1rem 1rem' }}>
			<div
				style={{
					overflow: 'auto',
					backgroundColor: 'white',
					borderRadius: '6px',
				}}>
				<div className='profiles-tble-wrap'>
					<div className='search-fild-dv'>
						<div className='search-fild'>
							<AiOutlineSearch style={{ fontSize: '22px', color: '#afabab' }} />
							<input type='text' placeholder='Search...' name='searchprofile' onChange={handleSearch} className='profile-search-inpt' />
						</div>
					</div>
					<div className=' tablecontain'>
						<table className='adTable'>
							<tr className='adTable-tr' style={{ backgroundColor: '#1d2630' }}>
								<th className='adTable-th'>Name</th>
								<th className='adTable-th'>Last Name</th>
								<th className='adTable-th'>Email</th>
								<th className='adTable-th'>Models Downloaded</th>
								<th className='adTable-th'>Subscription Status</th>
								<th className='adTable-th'>Starting Date</th>
								<th className='adTable-th'></th>
							</tr>

							{userList
								.filter((val) => {
									if (searchItem == '') {
										return val;
									} else if (val.firstName.includes(searchItem.toLowerCase())) {
										return val;
										// } else if (
										//   val.lastName
										//     .toLowerCase()
										//     .includes(searchItem.toLowerCase())
										// ) {
										//   return val
									} else if (val.email.toLowerCase().includes(searchItem.toLowerCase())) {
										return val;
									}
								})
								.map((item, key) => {
									return (
										<tr className='adTable-tr'>
											<td className='adTable-td'>{item.firstName}</td>
											<td className='adTable-td'>{item.lastName}</td>
											<td className='adTable-td'>{item.email}</td>
											<td className='adTable-td'>{item.modelDownloaded ? item.modelDownloaded.length : 0}</td>
											<td className='adTable-td'>{item.payment.status}</td>
											<td className='adTable-td'>{item.startedAt}</td>

											<td className='adTable-td'>
												<div>
													<Link to={{ pathname: '/customerpanel', state: { id: item._id } }}>
														<button
															style={{
																marginRight: '0.5rem',
																color: 'white',
																backgroundColor: '#ff5900',
																border: 'none',
																height: '25px',
																borderRadius: '5px',
															}}>
															Edit
														</button>
													</Link>

													<button
														onClick={() => {
															cancelSubscription(item);
														}}
														disabled={item.status === 'canceled'}
														style={{
															marginRight: '0.5rem',
															color: 'white',
															backgroundColor: '#ff5900',
															border: 'none',
															height: '25px',
															borderRadius: '5px',
														}}>
														Cancel
													</button>
													<button
														onClick={() => {
															deleteAndRefund(item);
														}}
														style={{
															color: 'white',
															backgroundColor: '#ff5900',
															border: 'none',
															height: '25px',
															borderRadius: '5px',
														}}>
														Refund
													</button>
												</div>
											</td>
										</tr>
									);
								})}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
