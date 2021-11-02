import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from '../../../AxiosInstance';
import { useHistory } from 'react-router-dom';

export default function AllModels(props) {
	const history = useHistory();
	const [modelList, setModelList] = useState([]);
	useEffect(() => {
		axios
			.get('model/getAllModels')
			.then((res) => {
				console.log('Response', res.data);
				setModelList(res.data.models);
			})
			.catch((err) => {
				console.log('Response', err.response);
			});
	}, []);
	const handleUpdate = (e) => {
		console.log('asasd4545');
		history.push({ pathname: 'updateModel', state: { ...e } });
	};

	const handleDelete = async (data) => {
		const originalState = modelList;

		const temp = modelList.filter((c) => c._id !== data._id);
		setModelList(temp);

		await axios
			.delete(`model/deleteModel/${data._id}`) //remove from Database
			.then((res) => {})
			.catch((err) => {
				alert('ERROR : User Not Deleted');
				setModelList(originalState);
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
					<div className=' tablecontain'>
						<table className='adTable'>
							<tr className='adTable-tr' style={{ backgroundColor: '#1d2630' }}>
								<th className='adTable-th'>Name</th>
								<th className='adTable-th'>Discription</th>
								<th className='adTable-th'>Instruction</th>
								<th className='adTable-th'>Model Id</th>
								<th className='adTable-th'>Category</th>
								<th className='adTable-th'></th>
								<th className='adTable-th'></th>
							</tr>

							{modelList.map((item, key) => {
								return (
									<tr className='adTable-tr'>
										<td className='adTable-td'>{item.name}</td>
										<td className='adTable-td'>{item.description}</td>
										<td className='adTable-td'>{item.modelInstruction}</td>
										<td className='adTable-td'>{item.modelId}</td>
										<td className='adTable-td'>{item.category}</td>
										<td className='adTable-td'>{item.modelImage}</td>

										<td className='adTable-td d-flex justify-content-between'>
											<button
												onClick={() => props.handleEditModel(item)}
												style={{
													backgroundColor: '#ff5900',
													color: 'white',
													border: 'none',
													borderRadius: '5px',
													height: '25px',
													width: '40px',
												}}>
												Edit
											</button>

											<button
												onClick={() => handleDelete(item)}
												style={{
													backgroundColor: '#ff5900',
													color: 'white',
													border: 'none',
													borderRadius: '5px',
													height: '25px',
													width: '55px',
												}}>
												Delete
											</button>
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
