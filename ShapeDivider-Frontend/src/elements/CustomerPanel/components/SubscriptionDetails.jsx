import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from '../../authService';
import axios from '../../../AxiosInstance';
import './Subscription.css';

const SubscriptionDetails = () => {
	const user = auth.getCurrentUser();
	console.log(user);
	const [subscriptionList, setSubscriptionList] = useState([]);
	const [subs, setSubs] = useState({});
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const getInvoices = () => {
		axios
			.post('payment/getInvoice', { userId: user._id })
			.then((res) => {
				console.log('getInvoice', res.data.list.data);
				setSubscriptionList(res.data.list.data);
			})
			.catch((err) => {
				console.log('getInvoice', err.response);
			});
	};

	const getUserSubscription = () => {
		axios
			.post('payment/getUserSubscription', { userId: user._id })
			.then((res) => {
				console.log('getUserSubscription', res.data.subscription);
				setSubs(res.data.subscription);
			})
			.catch((err) => {
				console.log('getInvoice', err.response);
			});
	};

	useEffect(() => {
		if (user) {
			getInvoices();
			getUserSubscription();
		}
	}, []);

	const handleCancleSubscription = () => {
		if (user) {
			axios
				.post('payment/cancelSubscriptionRequest', { id: user._id })
				.then((res) => {
					console.log('cancel subscription success messagge', res.data.message);
					getInvoices();
					getUserSubscription();
				})
				.catch((err) => {
					console.log('cancel subscription failure', err.response);
					if (err.response && err.response.data) {
						alert(err.response.data.message);
					} else {
						alert(err.message);
					}
				});
		}
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
					<div className=' tablecontain'>
						<table className='adTable'>
							<tr className='adTable-tr' style={{ backgroundColor: '#1d2630' }}>
								<th className='adTable-th'>Email</th>

								<th className='adTable-th'>Paid</th>
								<th className='adTable-th'>Starting Date</th>
								<th className='adTable-th'>Renewal Date</th>
								<th className='adTable-th'>Status</th>

								<th className='adTable-th'></th>
							</tr>

							{subscriptionList.map((item, key) => {
								return (
									<tr className='adTable-tr'>
										<td className='adTable-td'>{item.customer_email}</td>

										<td className='adTable-td'>{item.amount_paid}</td>
										<td className='adTable-td'>{new Date(item.period_start * 1000).toDateString()}</td>
										<td className='adTable-td'>{item.date_renewal}</td>
										<td className='adTable-td'>{subs.status}</td>

										<td className='adTable-td'>
											<button onClick={handleClickOpen}>Edit</button>
										</td>
									</tr>
								);
							})}
						</table>
					</div>
				</div>

				<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>{'Edit Pyament Details/Cancel Subscription'}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							<Button onClick={handleCancleSubscription} color='primary'>
								Cancel Subscription
							</Button>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default SubscriptionDetails;
