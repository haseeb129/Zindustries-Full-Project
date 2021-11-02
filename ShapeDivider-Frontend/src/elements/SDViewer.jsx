import React, { Component } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import InputNumber from 'react-input-number';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import { BiImageAlt, BiText } from 'react-icons/bi';
import { IoMdResize, IoIosColorPalette } from 'react-icons/io';
import { CgShapeRhombus, CgShapeHexagon } from 'react-icons/cg';
import { GrAddCircle } from 'react-icons/gr';
import { AiFillStar } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { RiText } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import './ShapeDiver.css';
import Header from '../component/header/Header';
import { RiNumbersFill } from 'react-icons/ri';
import Switch from './Switch';
import RangeSlider from './RangeSlider';
import auth from './authService';
import './ShapeDiver.css';
import axios from '../AxiosInstance';
export default class SDViewer extends React.Component {
	constructor(props) {
		super(props);
		// create a reference to the viewer container created in render
		this.containerSD = React.createRef();
		// ShapeDiver Viewer API object
		this.api = null;
		// Parameter definitions, will get set once model has been loaded and parameters are registered
		this.parameters = null;
	}
	state = {
		currentUser: auth.getCurrentUser(),
		api: null,
		Link: null,
		basicSelectedParameter: null,
		basicParameters: {
			color: [],
			dimentions: [],
			geometry: [],
			text: [],
			shape: [],
			accesories: [],
			add_on: [],
			functionality: [],
			special: [],
		},
		ticket: this.props.location.state
			? this.props.location.state.ticket
			: '20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5',
		// : "2414730bc0b2e2522f74e12b2feef5d499ab3b2909240a2eba83df06acc9a0203bfb63feb76d5ed2153eb9fc8aa02fe0e0de8837d006dcce968cc81634baa71c8e66a5e56cb661dc3bdedcbbb55fa50b4ab9eb4c75f4fbb25b4a933dd94ed4028e481b816bc978530667fd08623b0f0b94a274c01728-8fc0535de130107e603473851c2958ee",
		//replace this string value with desire ticket value

		// : "20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5",

		// ticket:
		//   "20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5",
		// ticket:"ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba"
		// ticket:"85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c"

		// ticket:"8392f2ab5231da0d1b634ef6eb849be4c6e79c0e84456ca19fe03a4d1078fd02428704e23ee9b51e691ffb60550ea8f91493fa669ac900f86061e755441cf3da11c21d81dacf7975ba024ce9b604f2de708895dcdf4d4a17ca885516399e29111fc6d7f22e8ef1000651f56c91b4841a5527cb3d228b-0c9680ec95458327deab37e9fc1a432c"
		// ticket:
		//   "0ef6fd638461a6394a38efaaca1d42707e36dc5e1c4df11ef20c0352a39f4e59795488974123d70d7b450d4c5c28bb5df9ea6385e4a30ea0b25d97c14c3efdc00677757a7686a52319fab128e2d63bef21127a98f18e8eaf573325cc9cfad80e968b9bb609637b7c650f7b2ffb69a2d991b83922c480-9e8eca54204a201e9cace7cf2046baee",
		modelViewUrl: 'eu-central-1',
		modelId: this.props.location.state ? this.props.location.state.modelId : null,
	};

	async componentDidMount() {
		// container for the viewer
		// here the reference works and the container is loaded correctly
		let _container = this.containerSD.current;
		// console.log("this.containerSD", this.containerSD);

		// ShapeDiver Viewer constructor settings
		// Refer to https://app.shapediver.com/api for details
		let settings = {
			container: _container,
			showSceneMode: 1, // do not show the scene automatically
		};
		// construct an instance of the viewer
		this.api = new window.SDVApp.ParametricViewer(settings);

		this.setState({ api: this.api });

		// register a ShapeDiver CommPlugin
		await this.api.plugins.registerCommPluginAsync({
			// ticket of the model as shown on app.shapediver.com
			ticket: this.state.ticket,
			// URL of the ShapeDiver backend system used
			modelViewUrl: this.state.modelViewUrl,
			// runtime id to use for this CommPlugin (you might register several)
			runtimeId: 'CommPlugin_1',
			// the following setting tells the viewer to wait with loading of geometry
			deferGeometryLoading: true,
		});

		// console.log("API Object", this.api);
		// console.log(
		//   'api.scene.get(null, "CommPlugin_1");',
		//   this.api.scene.get(null, "CommPlugin_1")
		// );

		console.log('API PARAMETERS', this.api.parameters);

		console.log('Setting Defination', this.api.getSettingDefinitions());
		console.log('ShapeDiver CommPlugin successfully loaded');
		console.log('API PARAMETERS', this.api.parameters.get());
		let apiParameters = await this.api.parameters.get();
		this.setState({ apiParameters }, () => console.log('After parameter set State', this.state));

		let { basicParameters } = this.state;
		await apiParameters.data.map(async (e) => {
			let name = e.name.toLowerCase();
			let type = e.type.toLowerCase();
			console.log('Name ', name, ' type ', type);

			if (name.includes('color') || name.includes('colors') || type.includes('color') || type.includes('colors')) {
				basicParameters.color.push(e);
			} else if (name.includes('font') || name.includes('fonts') || type.includes('font') || type.includes('fonts')) {
				basicParameters.text.push(e);
			} else if (name.includes('size') || name.includes('sizes') || type.includes('size') || type.includes('sizes') || name.includes('height') || type.includes('height') || name.includes('radius') || type.includes('radius')) {
				basicParameters.dimentions.push(e);
			} else basicParameters.special.push(e);
		});
		this.setState({ basicParameters }, () => {
			console.log('AAfter map push state', this.state.basicParameters);
		});
		// console.log("API PARAMETERS DATA", this.api.scene.getData());
		// console.log(
		//   "Checking file type",
		//   this.api.parameters.get({ type: "File" })
		// );
		//Update Settings

		//for single value update
		this.api.updateSettingAsync('scene.render.shadows', true);
		// console.log("Getting Setting object", this.api.getSettings());

		//for multiple update
		var updatedSettings = {
			scene: {
				render: {
					shadows: true,
				},
				camera: {
					rotationSpeed: 5,
				},
			},
		};
		this.api.updateSettingsAsync(updatedSettings).then((res) => {
			// console.log("responce", res);
		});

		// get parameters of the model
		this.parameters = await this.api.parameters.get().data;
		console.log('Available model parameters', this.parameters);

		// console.log("api.scene.getData()", this.api.scene.getData());
		this.api.scene.getData();

		// console.log("API", this);
		// console.log("api.exports.get()", this.api.exports.get().data);

		// refresh (load geometry), because the initial parameter update might not have changed any values
		await this.api.plugins.refreshPluginAsync('CommPlugin_1');

		// finally show the scene
		await this.api.updateSettingAsync('scene.show', true);
		let ImagePresentInMode = this.api.parameters.get({ type: 'File' }).data.length == 0 ? false : true;
		this.setState({ ImagePresentInMode });
		let exportData = await this.api.exports.get().data;
		// let exportObject = exportData.data[0] ? exportData.data[0] : null;

		var result = exportData.find((obj) => {
			return obj.type == 'download';
		});
		this.setState({ exportObject: result });
	}
	download = async () => {
		const { api, exportObject, currentUser, modelId } = this.state;
		console.log('exportObject', exportObject);
		console.log(currentUser);
		console.log(modelId);
		console.log('EXPORTED DAta', this.api.exports.get().data);
		await api.exports
			.requestAsync({ name: exportObject.name })
			.then(function (response) {
				var result = response.data;
				let link = result.content[0].href;
				console.log('Use this link to download the file: ' + link);
				window.location = link;

				axios
					.patch('auth/updateDownloadModel', {
						_id: currentUser._id,
						modelId: modelId,
					})
					.then((res) => console.log('Updated'))
					.catch((err) => console.log('Not Updated'));
			})
			.catch((err) => console.log('ERROR in Download', err));
	};

	onFileChange = (event) => {
		this.setState({ file: event.target.files[0] });
		this.api.parameters.updateAsync({
			name: 'Mug picture',
			value: event.target.files[0],
		});
	};

	onIntergerValueChange = (event, element) => {
		console.log('onIntergerValueChange', event, element);

		const { api } = this.state;

		api.parameters
			.updateAsync({
				name: element.name,
				value: parseInt(event),
			})
			.then(function (result) {
				console.log('Updated result ', result);
				// api.scene.camera.zoomAsync();
			})
			.catch((err) => console.log('ERROR while Updating', err));
		api.plugins.refreshPluginAsync('CommPlugin_1');
		api.updateSettingAsync('scene.show', true);
	};
	onBooleanValueChange = (event, element) => {
		console.log('onBooleanValueChange', event, element);
		let value = event.value == 'true' ? true : false;
		this.setState({ [element.name]: event });

		const { api } = this.state;
		api.parameters
			.updateAsync({
				name: element.name,
				value: event,
			})
			.then(function (result) {
				console.log('Updated result ', result);
				// api.scene.camera.zoomAsync();
			})
			.catch((err) => console.log('ERROR while Updating', err));
		api.plugins.refreshPluginAsync('CommPlugin_1');
		api.updateSettingAsync('scene.show', true);
	};
	onStringListValueChange = (event, element) => {
		console.log('onStringListValueChange', event, element);
		this.setState({ [element.name]: event.value });

		const { api } = this.state;
		api.parameters
			.updateAsync({
				name: element.name,
				value: event.value,
			})
			.then(function (result) {
				console.log('Updated result ', result);
				// api.scene.camera.zoomAsync();
			})
			.catch((err) => console.log('ERROR while Updating', err));
		api.plugins.refreshPluginAsync('CommPlugin_1');
		api.updateSettingAsync('scene.show', true);
	};
	onColorValueChange = (event, element) => {
		console.log('onColorValueChange', event, element);
		this.setState({ [event.target.name]: event.target.value });
	};
	onFloatValueChange = (event, element) => {
		// this.setState({ [event.target.name]: event.target.value });

		const { api } = this.state;
		console.log('Before request ', element.name, Number(event));
		api.parameters
			.updateAsync({
				name: element.name,
				value: Number(event),
			})
			.then(function (result) {
				console.log('Updated result ', result);
				// api.scene.camera.zoomAsync();
			})
			.catch((err) => console.log('ERROR while Updating', err));
		api.plugins.refreshPluginAsync('CommPlugin_1');
		api.updateSettingAsync('scene.show', true);
	};
	setSelectedParameter = (parameter) => {
		this.setState({ SelectedParameter: parameter });
	};
	setBasicSelectedParameter = (parameter) => {
		console.log('Checking parameter', parameter);
		this.setState({ basicSelectedParameter: parameter });
	};
	render() {
		return (
			<div style={{ height: '100vh' }}>
				<Header headertransparent='header--transparent' colorblack='color--black' logoname='logo.png' />
				<Container fluid className='pt--80' style={{ height: '100%', overflow: 'auto' }}>
					<Row className='p-2 sdview'>
						<Col
							md={8}
							style={{
								paddingLeft: '0px',
								paddingRight: '1px',
								height: '100%',
								overflow: 'auto',
							}}>
							<div ref={this.containerSD} style={{ width: '100%', height: '80vh' }} />
						</Col>
						<Col md={4} className='parameters-bg  p-0' style={{ height: '100%' }}>
							<h3 className='text-center'>MODEL PARAMETERS</h3>
							{!this.state.SelectedParameter && !this.state.basicSelectedParameter && (
								<Container fluid>
									<Row className='mb-2'>
										{this.state.basicParameters &&
											Object.keys(this.state.basicParameters).map((e) => {
												if (this.state.basicParameters[e].length > 0)
													return (
														<Col md={4} sm={4} xs={4} style={{ padding: '8px' }} onClick={() => this.setBasicSelectedParameter(e)}>
															<div className='singleBox'>
																<Row className='centered'>
																	{e == 'color' ? (
																		<IoIosColorPalette size={60} />
																	) : e == 'dimentions' ? (
																		<IoMdResize size={60} />
																	) : e == 'geometry' ? (
																		<CgShapeRhombus size={60} />
																	) : e == 'text' ? (
																		<BiText size={60} />
																	) : e == 'shape' ? (
																		<CgShapeHexagon size={60} />
																	) : e == 'add_on' ? (
																		<GrAddCircle size={60} />
																	) : e == 'special' ? (
																		<AiFillStar size={60} />
																	) : (
																		<FiEdit3 size={60} />
																	)}
																</Row>
																<Row className='centered'>
																	<p
																		style={{
																			lineHeight: 'normal',
																			wordBreak: 'break-all',
																			marginBottom: '0px',
																			fontSize: '13px',
																		}}>
																		{e}
																	</p>
																</Row>
															</div>
														</Col>
													);
											})}
									</Row>
								</Container>
							)}
							{this.state.basicSelectedParameter && !this.state.SelectedParameter && (
								<Container fluid>
									<Row className='mb-2'>
										{this.state.basicParameters[this.state.basicSelectedParameter] &&
											this.state.basicParameters[this.state.basicSelectedParameter].map((e) => {
												return (
													<Container fluid>
														{e.type == 'Int' && (
															<div className='mt-1 editBlock '>
																<p>{e.name}</p>
																<RangeSlider onChangeParent={this.onIntergerValueChange} element={e} />
															</div>
														)}

														{e.type == 'Float' && (
															<div className='mt-1 editBlock '>
																<p>{e.name}</p>
																<RangeSlider onChangeParent={this.onFloatValueChange} element={e} />
															</div>
														)}
														{e.type == 'Color' && (
															<div className='mt-1 editBlock '>
																<p className='m-0'>{e.name}</p>

																<Container fluid>
																	<Row>
																		<Col
																			md={6}
																			xs={12}
																			style={{
																				padding: '0px',
																			}}>
																			<Form.Control
																				value={this.state[e.name]}
																				name={e.name}
																				type='text'
																				onChange={(event) => {
																					this.onColorValueChange(event, e);
																				}}
																			/>
																		</Col>
																		<Col md={6} xs={12}>
																			<Button
																				block
																				onClick={() => {
																					const { api } = this.state;
																					api.parameters
																						.updateAsync({
																							name: e.name,
																							value: this.state[e.name],
																						})
																						.then(function (result) {
																							console.log('Updated result ', result);
																						})
																						.catch((err) => console.log('ERROR while Updating', err));
																					api.plugins.refreshPluginAsync('CommPlugin_1');
																					api.updateSettingAsync('scene.show', true);
																				}}>
																				Apply
																			</Button>
																		</Col>
																	</Row>
																</Container>
															</div>
														)}

														{e.type == 'Bool' && (
															<div className='mt-1 editBlock '>
																<p>{e.name}</p>

																<Switch onChangeParent={this.onBooleanValueChange} element={e} />
															</div>
														)}

														{e.type == 'StringList' && (
															<div className='mt-1 editBlock '>
																<p>{e.name}</p>

																<Select
																	placeholder={e.choices[e.value]}
																	onChange={(event) => {
																		this.onStringListValueChange(event, e);
																	}}
																	options={e.choices.map((choicesElement, index) => {
																		return {
																			value: index,
																			label: choicesElement,
																		};
																	})}
																/>
															</div>
														)}

														{e.type == 'File' && (
															<div className='mt-1 editBlock '>
																<p>Select File</p>

																<input style={{ border: 'none', padding: '0px' }} type='file' onChange={this.onFileChange} />
															</div>
														)}
													</Container>
												);
											})}

										{this.state.exportObject && this.state.currentUser && this.state.basicSelectedParameter === 'special' && (
											<Container>
												<div
													className='mt-1  centered'
													style={{
														backgroundColor: 'white',
														padding: '10px',
														paddingTop: '20px',
														paddingBottom: '20px',
													}}>
													<Button className='downloadButton' onClick={this.download}>
														Download 3D Model
													</Button>
												</div>
											</Container>
										)}
									</Row>
									<Container>
										<Row>
											<Col className='p-0'>
												<Button
													className='backButton'
													variant='default'
													onClick={() => {
														this.setState({ basicSelectedParameter: null });
													}}>
													Back
												</Button>
											</Col>
										</Row>
									</Container>
								</Container>
							)}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
