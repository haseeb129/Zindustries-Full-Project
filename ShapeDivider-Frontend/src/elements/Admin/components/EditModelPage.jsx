import React, { useState, useEffect } from 'react';
import './Models.css';
// import modelimage from "../../../Assets/images/products/prod2.jpg";
import axios, { BASE_URL } from '../../../AxiosInstance';
import { useHistory } from 'react-router-dom';

export default function EditModelPage() {
	const history = useHistory();

	const [values, setValues] = useState({
		model_id: '',
		modelName: '',
		modelKey: '',
		modelDiscription: '',
		modelImage: '',
		Picture: '',
		file: null,
	});
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		console.log('MEW AAA', history.location.state);

		if (history.location.state) {
			const object = history.location.state;
			setValues({
				model_id: object._id,
				modelName: object.name,
				Picture: object.modelImage,
				modelDiscription: object.description,
				modelKey: object.ticket,
				file: null,
			});
		}
	}, []);

	const _onChange = async (e) => {
		console.log('aaaaaaaaaa');
		let Picture = '';
		const file = e.target.files[0];
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function (e) {
				Picture = reader.result;
				setValues({ ...values, file, Picture: reader.result });
			};
		}

		setValues({ ...values, file, Picture });
		console.log('values', values, file, Picture);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('This is submit State', values);
		const data = new FormData();

		if (values.file !== null) {
			await data.append('modelImage', values.file);
		}
		await data.append('_id', values.model_id);
		await data.append('name', values.modelName);
		await data.append('description', values.modelDiscription);
		await data.append('ticket', values.modelKey);

		await axios
			.patch('model/updateModel', data)
			.then((res) => {
				console.log('Response', res);
				history.push({ pathname: '/adminpanel', state: true });
			})
			.catch((err) => {
				console.log('ERROR', err);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className='row model-pg-contnt'>
					<div className='col-lg-1 col-md-1 col-12'></div>
					<div className='col-lg-4 col-12'>
						<div className='upload-model-dv'>
							<div className='model-wrap'>
								{values.file === null && <img src={BASE_URL + values.Picture} alt='' />}
								{values.file !== null && <img src={values.Picture} alt='' />}
							</div>
							<div className='uplod-pic-dv'>
								<button className='uplod-btn'>Upload Picture</button>

								<input type='file' size='lg' block onChange={_onChange} />
							</div>
						</div>
					</div>
					<div className='col-lg-6 col-12'>
						<div className='edit-model-cntnt'>
							<div className='model-edit-wrap'>
								<div className='d-flex justify-content-between' style={{ paddingBottom: '1rem' }}>
									<div>
										<label>Enter Model Name</label>
										<input value={values.modelName} name='modelName' onChange={handleChange} type='text' placeholder='Model Name' required style={{ width: '98%', borderRadius: '5px' }} />
									</div>
									<div>
										<label>Enter Model Key</label>
										<input required value={values.modelKey} name='modelKey' onChange={handleChange} type='text' placeholder='Model Key' style={{ width: '98%', borderRadius: '5px' }} />
									</div>
								</div>

								<label>Enter Model description</label>
								<input required value={values.modelDiscription} onChange={handleChange} name='modelDiscription' type='text' placeholder='Model Description' style={{ borderRadius: '5px' }} />
							</div>
							<div className='model-uplod-dv'>
								<button type='submit' className='uplod-model-bttn'>
									{values.model_id ? 'Update Model' : 'Add model'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
