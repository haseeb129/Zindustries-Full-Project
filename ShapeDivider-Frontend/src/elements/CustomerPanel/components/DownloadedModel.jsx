import React, { useState, useEffect } from 'react';

import auth from '../../authService';
import axios from '../../../AxiosInstance';

const DownloadedModel = () => {
	let user = auth.getCurrentUser();
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		console.log('user ', user);
		if (user) {
			axios
				.post('auth/getuserById', { id: user._id })
				.then((res) => {
					setCurrentUser(res.data.user);
					console.log('get user by id', res.data.user);
					// setSubscriptionList(res.data.list.data);
				})
				.catch((err) => {
					console.log('getInvoice', err.response);
				});
		}
	}, []);

	return (
		<div style={{ padding: '5rem 1rem 1rem 1rem' }}>
			<div
				style={{
					overflow: 'auto',
					backgroundColor: 'white',
					borderRadius: '6px',
				}}>
				<div className='profiles-tble-wrap'>
					<div className=' tablecontain'>
						<table className='adTable'>
							<tr className='adTable-tr' style={{ backgroundColor: '#1d2630' }}>
								<th className='adTable-th'>Model Name</th>
								<th className='adTable-th'>Date</th>
								<th className='adTable-th'>Model ID</th>

								<th className='adTable-th'>Order Number</th>
							</tr>

							{currentUser.downloadedData &&
								currentUser.downloadedData.map((item, key) => {
									return (
										<tr className='adTable-tr'>
											<td className='adTable-td'>{currentUser.modelDownloaded && currentUser.modelDownloaded.filter((d) => d._id === item.modelId)[0].name}</td>
											<td className='adTable-td'>{item.date}</td>
											<td className='adTable-td'>{currentUser.modelDownloaded && currentUser.modelDownloaded.filter((d) => d._id === item.modelId)[0].modelId}</td>
											<td className='adTable-td'>{item.orderId}</td>
										</tr>
									);
								})}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DownloadedModel;
