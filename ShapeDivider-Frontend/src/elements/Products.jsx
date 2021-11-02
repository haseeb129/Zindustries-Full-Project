import React, { Component } from 'react';
import PageHelmet from '../component/common/Helmet';

import { Link } from 'react-router-dom';
import { FiChevronUp } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import ScrollToTop from 'react-scroll-up';
import Header from '../component/header/Header';
import Footer from '../component/footer/FooterThree';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { blue } from '@material-ui/core/colors';
import prod1 from '../Assets/images/products/prod1.jpg';
import prod2 from '../Assets/images/products/prod2.jpg';
import prod3 from '../Assets/images/products/prod3.jpg';
import prod4 from '../Assets/images/products/prod4.jpg';
import prod5 from '../Assets/images/products/prod5.jpg';
import Pagination from './Pagination';
import axios from '../AxiosInstance';
import { BASE_URL } from '../AxiosInstance';
const Prodlist = [
	{
		img: prod1,
		title: ' UNRUH',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5',
	},

	{
		img: prod2,
		title: 'MINISTRY OF SNUS',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: 'ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba',
	},

	{
		img: prod3,
		title: 'storetech',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c',
	},
	{
		img: prod4,
		title: 'MUNSON',
		description: 'Munson built a stylized configurator with a smooth interface and connected the orders directly with production data.',
		ticket: '8392f2ab5231da0d1b634ef6eb849be4c6e79c0e84456ca19fe03a4d1078fd02428704e23ee9b51e691ffb60550ea8f91493fa669ac900f86061e755441cf3da11c21d81dacf7975ba024ce9b604f2de708895dcdf4d4a17ca885516399e29111fc6d7f22e8ef1000651f56c91b4841a5527cb3d228b-0c9680ec95458327deab37e9fc1a432c',
	},

	{
		img: prod5,
		title: 'Model No',
		description: 'Model No’s unique customization tools allow you to design in real time.Their 3d printed pieces have simple but elegant.',
		ticket: '0ef6fd638461a6394a38efaaca1d42707e36dc5e1c4df11ef20c0352a39f4e59795488974123d70d7b450d4c5c28bb5df9ea6385e4a30ea0b25d97c14c3efdc00677757a7686a52319fab128e2d63bef21127a98f18e8eaf573325cc9cfad80e968b9bb609637b7c650f7b2ffb69a2d991b83922c480-9e8eca54204a201e9cace7cf2046baee',
	},
	{
		img: prod1,
		title: ' UNRUH',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5',
	},

	{
		img: prod2,
		title: 'MINISTRY OF SNUS',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: 'ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba',
	},

	{
		img: prod3,
		title: 'storetech',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c',
	},
	{
		img: prod4,
		title: 'MUNSON',
		description: 'Munson built a stylized configurator with a smooth interface and connected the orders directly with production data.',
		ticket: '8392f2ab5231da0d1b634ef6eb849be4c6e79c0e84456ca19fe03a4d1078fd02428704e23ee9b51e691ffb60550ea8f91493fa669ac900f86061e755441cf3da11c21d81dacf7975ba024ce9b604f2de708895dcdf4d4a17ca885516399e29111fc6d7f22e8ef1000651f56c91b4841a5527cb3d228b-0c9680ec95458327deab37e9fc1a432c',
	},

	{
		img: prod5,
		title: 'Model No',
		description: 'Model No’s unique customization tools allow you to design in real time.Their 3d printed pieces have simple but elegant.',
		ticket: '0ef6fd638461a6394a38efaaca1d42707e36dc5e1c4df11ef20c0352a39f4e59795488974123d70d7b450d4c5c28bb5df9ea6385e4a30ea0b25d97c14c3efdc00677757a7686a52319fab128e2d63bef21127a98f18e8eaf573325cc9cfad80e968b9bb609637b7c650f7b2ffb69a2d991b83922c480-9e8eca54204a201e9cace7cf2046baee',
	},
	{
		img: prod1,
		title: ' UNRUH',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5',
	},

	{
		img: prod2,
		title: 'MINISTRY OF SNUS',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: 'ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba',
	},

	{
		img: prod3,
		title: 'storetech',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c',
	},
	{
		img: prod4,
		title: 'MUNSON',
		description: 'Munson built a stylized configurator with a smooth interface and connected the orders directly with production data.',
		ticket: '8392f2ab5231da0d1b634ef6eb849be4c6e79c0e84456ca19fe03a4d1078fd02428704e23ee9b51e691ffb60550ea8f91493fa669ac900f86061e755441cf3da11c21d81dacf7975ba024ce9b604f2de708895dcdf4d4a17ca885516399e29111fc6d7f22e8ef1000651f56c91b4841a5527cb3d228b-0c9680ec95458327deab37e9fc1a432c',
	},

	{
		img: prod5,
		title: 'Model No',
		description: 'Model No’s unique customization tools allow you to design in real time.Their 3d printed pieces have simple but elegant.',
		ticket: '0ef6fd638461a6394a38efaaca1d42707e36dc5e1c4df11ef20c0352a39f4e59795488974123d70d7b450d4c5c28bb5df9ea6385e4a30ea0b25d97c14c3efdc00677757a7686a52319fab128e2d63bef21127a98f18e8eaf573325cc9cfad80e968b9bb609637b7c650f7b2ffb69a2d991b83922c480-9e8eca54204a201e9cace7cf2046baee',
	},
	{
		img: prod1,
		title: ' UNRUH',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5',
	},

	{
		img: prod2,
		title: 'MINISTRY OF SNUS',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: 'ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba',
	},

	{
		img: prod3,
		title: 'storetech',
		description: 'Storetech implemented a complex interface with advanced logic for their Garden Master shed products.',
		ticket: '85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c',
	},
	{
		img: prod4,
		title: 'MUNSON',
		description: 'Munson built a stylized configurator with a smooth interface and connected the orders directly with production data.',
		ticket: '8392f2ab5231da0d1b634ef6eb849be4c6e79c0e84456ca19fe03a4d1078fd02428704e23ee9b51e691ffb60550ea8f91493fa669ac900f86061e755441cf3da11c21d81dacf7975ba024ce9b604f2de708895dcdf4d4a17ca885516399e29111fc6d7f22e8ef1000651f56c91b4841a5527cb3d228b-0c9680ec95458327deab37e9fc1a432c',
	},
];

const limit = 2;
const pageCount = 3;
const total = Prodlist.length * limit;

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		color: theme.typography.color(blue),
	},
}));

class Service extends Component {
	state = {
		checked: true,
		checked1: true,

		currentPageNumber: 1,
		postPerPage: 15,
		currentPosts: [],

		Products: Prodlist,
	};
	componentDidMount() {
		axios
			.get('model/getAllModels')
			.then((res) =>
				this.setState({ Products: res.data.models }, () => {
					let currentPosts = this.state.Products.slice(indexOfFirstPages, indexOfLastPage);
					this.setState({ currentPosts: currentPosts });
				}),
			)
			.catch((err) => console.log('Err', err));
		let indexOfLastPage = 1 * this.state.postPerPage;
		let indexOfFirstPages = indexOfLastPage - this.state.postPerPage;
		// let currentPosts = this.state.Products.slice(
		//   indexOfFirstPages,
		//   indexOfLastPage
		// );
		// this.setState({ currentPosts: currentPosts });
	}
	paginate = (pageNumber) => {
		this.setState({ currentPageNumber: pageNumber });
		let indexOfLastPage = pageNumber * this.state.postPerPage;
		let indexOfFirstPages = indexOfLastPage - this.state.postPerPage;
		let currentPosts = this.state.Products.slice(indexOfFirstPages, indexOfLastPage);
		this.setState({ currentPosts: currentPosts });
	};

	handleChange = (checked) => {
		this.setState({ checked });
	};

	handleChange1 = (checked1) => {
		this.setState({ checked1 });
	};

	render() {
		return (
			<React.Fragment>
				<PageHelmet pageTitle='Service' />
				<Header headertransparent='header--transparent' colorblack='color--black' logoname='logo.png' />
				<div id='Main' className='below-headr'>
					<div className='below-headr-wrap'>
						<div className=' d-flex justify-content-between  pt--150 pb--40'>
							<div>
								<h3 className='below-headr-t'>New customizable 3D models every week,</h3>

								<p style={{ color: '#5c6a72' }}>
									Choose your favorite product or
									<Link to='/contact'>
										{' '}
										<u style={{ fontWeight: '600', color: '#5c6a72' }}>suggest new product.</u>
									</Link>
								</p>
							</div>
							<div style={{ paddingTop: '2rem' }}>
								<Link to='/contact' className='reprt-btn'>
									Report a Bug
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className='product-area'>
					<div className='product-contain'>
						<div className='side-menu'>
							<div className='search-dvs'>
								<div className='searchbar pb--30'>
									<Paper component='form'>
										<InputBase placeholder='Search by filters ' inputProps={{ 'aria-label': 'search google maps' }} style={{ width: '280px' }} />
										<IconButton type='submit' aria-label='search'>
											<SearchIcon />
										</IconButton>
									</Paper>
								</div>

								<div className='side-menu'>
									<div className='d-flex justify-content-between'>
										<h4>CATEGORIES</h4>
										<button
											style={{
												border: 'none',
												color: 'gray',
												fontSize: '15px',
											}}>
											<u>Clear All</u>
										</button>
									</div>
									<div className='side-menu-collapse'>
										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
												<Typography className={useStyles.heading}>USAGE</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
												<Typography className={useStyles.heading}>INDUSTRY</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
												<Typography className={useStyles.heading}>AUTOMATED</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
												<Typography className={useStyles.heading}>SEASONAL</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
											</AccordionDetails>
										</Accordion>
									</div>
								</div>
							</div>
						</div>
						<div style={{ width: '40px' }}></div>
						<div className='product-area'>
							<div className='row'>
								<div className='service-area creative-service-wrapper ptb--60 bg_color--1' style={{ width: '100%' }}>
									<div className='row creative-service'>
										{this.state.currentPageNumber === 1 && (
											<div className='  col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 text-center' style={{ padding: '2rem' }}>
												<div className='blnk-temp-wrp'>
													{' '}
													<div className='image'>
														<FiEdit className='blnk-icn' />
													</div>
													<div className='blank-content'>
														<h3
															style={{
																fontWeight: '500',
																fontSize: '20px',
																marginBottom: '0.3em',
															}}>
															BLANK TEMPLATE
														</h3>
														<p style={{ fontSize: '14px', lineHeight: '17px' }}>Start from Scratch</p>
													</div>
													<div className='blank-bttn d-flex justify-content-center'>
														<Link to='/sdviewer'>
															<span className='strt-design'>
																<FaRegEdit
																	style={{
																		color: 'white',
																		fontSize: '24px',
																		paddingRight: '3px',
																	}}
																/>
																START MAKING
															</span>
														</Link>
													</div>
												</div>
											</div>
										)}

										{this.state.currentPosts.map((val, i) => (
											<div
												className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12'
												key={i}
												onClick={() => {
													this.props.history.push({
														pathname: '/sdviewer',
														state: { ticket: val.ticket, modelId: val._id },
													});
												}}>
												<a className='text-center'>
													<div className='service service__style--2'>
														<div className='icon'>
															<img alt='something' src={BASE_URL + val.modelImage} />
														</div>
														<div className='content'>
															<h3 className='title'>{val.title}</h3>
															<p>{val.description}</p>
														</div>
													</div>
												</a>
											</div>
										))}
									</div>
								</div>
							</div>
							<div>
								<Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.Products.length} paginate={this.paginate} />
							</div>
						</div>
					</div>
				</div>
				{/* End Service Area */}

				{/* Start Back To Top */}
				<div className='backto-top'>
					<ScrollToTop showUnder={160}>
						<FiChevronUp />
					</ScrollToTop>
				</div>
				{/* End Back To Top */}

				<Footer />
			</React.Fragment>
		);
	}
}
export default Service;
