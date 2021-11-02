import React, { useState, useEffect } from 'react';
import './Models.css';
import modelimage from '../../../Assets/images/products/prod2.jpg';
import axios, { BASE_URL } from '../../../AxiosInstance';
import { useHistory } from 'react-router-dom';

import UploadModel from './uploadModel';

export default function Modals(props) {
	const history = useHistory();

	const [values, setValues] = useState({
		model_id: null,
		modelName: '',
		modelKey: '',
		modelDiscription: '',
		modelImage: '',
		modelId: '',
		modelInstruction: '',
		category: '',
		Picture: '',
		file: null,
	});
	const [fileList, setFileList] = useState([]);

	React.useEffect(() => {
		if (props.isEdited) {
			setValues({
				model_id: props.editedModel._id,
				modelName: props.editedModel.name,
				modelKey: props.editedModel.ticket,
				modelDiscription: props.editedModel.description,
				modelImage: props.editedModel.modelImage,
				modelId: props.editedModel.modelId,
				modelInstruction: props.editedModel.modelInstruction,
				category: props.editedModel.category,
				Picture: props.editedModel.modelImage,
			});
		}
	}, [props.isEdited, props.editedModel]);

	const onChange = (info) => {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
			setFileList([...info.fileList]);
		}
		if (info.file.status === 'done') {
			// message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			// message.error(`${info.file.name} file upload failed.`);
		}
	};

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		console.log('sadada', history.location.state);

		if (history.location.state) {
			const object = history.location.state;
			setValues({
				model_id: object._id,
				modelName: object.name,
				file: object.modelImage,
				modelDiscription: object.description,
				modelKey: object.ticket,
			});
		}
	}, []);

	const _onChange = async (info) => {
		console.log(info.file);
		let Picture = '';
		const file = info.file;
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file.originFileObj);
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

		if (values.file !== null) {
			const data = new FormData();
			data.append('modelImage', values.file.originFileObj);
			data.append('name', values.modelName);
			data.append('description', values.modelDiscription);
			data.append('ticket', values.modelKey);
			data.append('modelId', values.modelId);
			data.append('modelInstruction', values.modelInstruction);
			data.append('category', values.category);

			await axios
				.post('model/addModel', data)
				.then((res) => {
					console.log('Response', res);
					setValues({
						model_id: null,
						modelName: '',
						modelKey: '',
						modelDiscription: '',
						modelImage: '',
						modelId: '',
						modelInstruction: '',
						category: '',
						Picture: '',
						file: null,
					});
					setFileList([]);
				})
				.catch((err) => {
					console.log('Response', err.response);
				});
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		console.log('This is submit State', values);
		const data = new FormData();

		if (values.file !== null) {
			await data.append('modelImage', values.file.originFileObj);
		}
		await data.append('_id', values.model_id);
		await data.append('name', values.modelName);
		await data.append('description', values.modelDiscription);
		await data.append('ticket', values.modelKey);
		data.append('modelId', values.modelId);
		data.append('modelInstruction', values.modelInstruction);
		data.append('category', values.category);

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
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				paddingTop: '5rem',
			}}>
			<form onSubmit={props.isEdited ? handleUpdate : handleSubmit} className='model-add-frm'>
				<div style={{ width: '100%' }}>
					<div className=' model-pg-contnt' style={{ width: '100%' }}>
						<div className='modl-add-field-dv'>
							<label className='model-add-lbl'> Model Name</label>
							<input value={values.modelName} name='modelName' onChange={handleChange} v type='text' placeholder='Model Name' required className='modl-inpt-fild' />
						</div>
						<div className='modl-add-field-dv'>
							{' '}
							<label className='model-add-lbl'> Model Key</label>
							<input required value={values.modelKey} name='modelKey' onChange={handleChange} type='text' placeholder='Model Key' className='modl-inpt-fild' />
						</div>
						<div className='modl-add-field-dv'>
							{' '}
							<label className='model-add-lbl'> Model ID</label>
							<input required value={values.modelId} name='modelId' onChange={handleChange} type='text' placeholder='Model ID' className='modl-inpt-fild' />
						</div>
						<div className='modl-add-field-dv'>
							{' '}
							<label className='model-add-lbl'>Model description</label>
							<input required value={values.modelDiscription} onChange={handleChange} name='modelDiscription' type='text' placeholder='Model Description' className='modl-inpt-fild' />
						</div>
						<div className='modl-add-field-dv'>
							{' '}
							<label className='model-add-lbl'>Model Instructions</label>
							<input required value={values.modelInstruction} onChange={handleChange} name='modelInstruction' type='text' placeholder=' Model Instructions' className='modl-inpt-fild' />
						</div>
						<div className='modl-add-field-dv'>
							<label className='model-add-lbl'> Model Category</label>
							<input required value={values.category} onChange={handleChange} name='category' type='text' placeholder='Model Category' className='modl-inpt-fild' />
						</div>

						<label className='model-add-lbl'> Model Image</label>
					</div>
					<div className='upload-model-dv'>
						<div className='model-wrap'>
							{console.log(BASE_URL + values.Picture)}
							{values.file === null && <img src={BASE_URL + values.Picture} alt='' />}
							{values.file !== null && <img src={values.Picture} alt='' />}
						</div>
						<div className='uplod-pic-dv'>
							<UploadModel
								onChange={_onChange}
								fileList={fileList}
								style={{
									backgroundColor: 'white',
								}}
							/>
						</div>

						<div className='model-uplod-dv'>
							{props.isEdited ? (
								<button type='submit' className='uplod-model-bttn'>
									Update Model
								</button>
							) : (
								<button type='submit' className='uplod-model-bttn'>
									Add Model
								</button>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
