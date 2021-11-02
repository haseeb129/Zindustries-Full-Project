import React, { useState, useEffect } from 'react';
import './Drawer.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Modals from './components/Modals';
import Profile from './components/Profile';
import AllModels from './components/AllModels';
import EmialMarketing from './components/EmialMarketing';
import { RiDashboardLine } from 'react-icons/ri';
import { FaModx } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { BiCollection } from 'react-icons/bi';
import { SiMarketo } from 'react-icons/si';
import logopic from '../../Assets/images/logo/logow.png';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function ResponsiveDrawer(props) {
	const history = useHistory();

	const { window } = props;

	const [isDashboard, setIsDashboard] = useState(false);
	const [isModals, setIsModals] = useState(true);
	const [isProfile, setIsProfile] = useState(false);
	const [isAllModels, setIsAllModels] = useState(false);

	const [isEmialMarketing, setIsEmialMarketing] = useState(false);

	useEffect(() => {
		console.log('History', history.location.state);
		let token = localStorage.getItem('adminToken');
		if (!token) {
			history.push('/adminlogin');
		}
		if (history.location.state) {
			setIsModals(true);
			setIsAllModels(true);
		}
	}, []);

	const handleLogout = () => {
		console.log('-=-------------------------==-');
		localStorage.removeItem('adminToken');
		history.push('/adminlogin');
	};

	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [isEdited, setIsEdited] = React.useState(false);
	const [editedModel, setEditedModel] = React.useState({});

	const handleEditModel = (data) => {
		setIsEdited(true);
		setEditedModel(data);
		setIsDashboard(false);
		setIsModals(true);
		setIsProfile(false);
		setIsAllModels(false);
		setIsEmialMarketing(false);
		setMobileOpen(false);
	};

	const drawer = (
		<div style={{ backgroundColor: '#25303c', height: '100vh' }}>
			<div style={{ padding: '60px 0' }}>
				<Link to='/'>
					<img src={logopic} alt='' style={{ objectFit: 'contain' }} />
				</Link>
			</div>
			<Divider />
			<List>
				<ListItem
					button
					style={
						isModals
							? {
									backgroundColor: '#2e2d2d',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setIsEdited(false);
						setIsDashboard(false);
						setIsModals(true);
						setIsProfile(false);
						setIsAllModels(false);
						setIsEmialMarketing(false);
						setMobileOpen(false);
						setEditedModel({});
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<FaModx
							style={
								isModals
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Add Modal' />
				</ListItem>

				<ListItem
					button
					style={
						isProfile
							? {
									backgroundColor: '#2e2d2d',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setEditedModel({});
						setIsEdited(false);
						setIsDashboard(false);
						setIsModals(false);
						setIsProfile(true);
						setIsAllModels(false);
						setIsEmialMarketing(false);
						setMobileOpen(false);
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<CgProfile
							style={
								isProfile
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Profiles' />
				</ListItem>

				<ListItem
					button
					style={
						isAllModels
							? {
									backgroundColor: '#2e2d2d',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setIsEdited(false);
						setIsDashboard(false);
						setIsModals(false);
						setIsProfile(false);
						setIsAllModels(true);
						setIsEmialMarketing(false);
						setEditedModel({});
						setMobileOpen(false);
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<BiCollection
							style={
								isAllModels
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='All Models' />
				</ListItem>

				<ListItem
					button
					style={
						isEmialMarketing
							? {
									backgroundColor: '#2e2d2d',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setIsEdited(false);
						setIsDashboard(false);
						setIsModals(false);
						setIsProfile(false);
						setIsAllModels(false);
						setIsEmialMarketing(true);
						setMobileOpen(false);
						setEditedModel({});
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<SiMarketo
							style={
								isEmialMarketing
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Emial Marketing' />
				</ListItem>
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={classes.appBar}
				style={{
					background: '#25303c',
					boxShadow: 'none',
					justifyContent: 'flex-end',
				}}>
				<Toolbar>
					<IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} className={classes.menuButton} style={{ color: 'black' }}>
						<MenuIcon />
					</IconButton>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							width: '100%',
						}}>
						<Button
							onClick={handleLogout}
							style={{
								backgroundColor: '#ff5700',
								color: 'white',
								fontWeight: '600',
							}}
							color='inherit'>
							Logout
						</Button>
					</div>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main
				style={{
					width: '100%',
					height: '100vh',
					backgroundColor: '#25303c',
					overflow: 'auto',
				}}>
				{/* <div className={classes.toolbar} /> */}

				{isDashboard && <Dashboard />}
				{isModals && <Modals isEdited={isEdited} editedModel={editedModel} />}
				{isProfile && <Profile />}
				{isAllModels && <AllModels handleEditModel={handleEditModel} />}
				{isEmialMarketing && <EmialMarketing />}
			</main>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ResponsiveDrawer;
