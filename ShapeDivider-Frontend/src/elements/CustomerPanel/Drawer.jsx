import React, { useState, useEffect } from 'react';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SubscriptionDetails from './components/SubscriptionDetails';
import EditProfile from './components/EditProfile';
import DownloadedModel from './components/DownloadedModel';
import ShipingInformation from './components/ShipingInfo';
import { CgProfile } from 'react-icons/cg';
import { BiDetail } from 'react-icons/bi';
import logopic from '../../Assets/images/logo/logow.png';
import { Link } from 'react-router-dom';
import axios from '../../AxiosInstance';
import auth from '../authService';
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
	const [user, setUser] = useState({});

	const { window } = props;

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
					setUser(user.data.user);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const [isEditProfile, setIsEditProfile] = useState(true);
	const [isDownloadedModel, setIsDownloadedModel] = useState(false);
	const [isSubscriptionDetails, setIsSubscriptionDetails] = useState(false);
	const [isShipingInformation, setIsShipingInformation] = useState(false);

	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
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
						isEditProfile
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
						setIsEditProfile(true);
						setIsSubscriptionDetails(false);
						setIsDownloadedModel(false);
						setIsShipingInformation(false);
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<CgProfile
							style={
								isEditProfile
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { fontSize: '20px', color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Profile' />
				</ListItem>

				<ListItem
					button
					style={
						isShipingInformation
							? {
									backgroundColor: '#1d2630',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setIsEditProfile(false);
						setIsSubscriptionDetails(false);
						setIsDownloadedModel(false);
						setIsShipingInformation(true);
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<InboxIcon
							style={
								isShipingInformation
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { fontSize: '20px', color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Shiping Information' />
				</ListItem>

				<ListItem
					button
					style={
						isSubscriptionDetails
							? {
									backgroundColor: '#1d2630',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setIsEditProfile(false);
						setIsSubscriptionDetails(true);
						setIsDownloadedModel(false);
						setIsShipingInformation(false);
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<BiDetail
							style={
								isSubscriptionDetails
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { fontSize: '20px', color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Subscription Details' />
				</ListItem>

				<ListItem
					button
					style={
						isDownloadedModel
							? {
									backgroundColor: '#1d2630',
									borderRadius: '10px',
									width: '215px',
									marginLeft: '0.8rem',
									color: 'white',
							  }
							: { width: '215px', marginLeft: '0.8rem', color: 'white' }
					}
					onClick={() => {
						setIsEditProfile(false);
						setIsSubscriptionDetails(false);
						setIsDownloadedModel(true);
						setIsShipingInformation(false);
					}}>
					<ListItemIcon style={{ minWidth: '38px' }}>
						<InboxIcon
							style={
								isDownloadedModel
									? {
											fontSize: '20px',
											color: 'white',
									  }
									: { fontSize: '20px', color: 'white' }
							}
						/>
					</ListItemIcon>
					<ListItemText primary='Downloaded Models' />
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
				}}>
				<Toolbar>
					<IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} className={classes.menuButton}>
						<MenuIcon style={{ color: 'black' }} />
					</IconButton>
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
					backgroundColor: '#25303c',
					height: '100vh',
					overflow: 'auto',
				}}>
				<div className={classes.toolbar} />
				{isEditProfile && <EditProfile user={user} />}
				{isDownloadedModel && <DownloadedModel />}
				{isSubscriptionDetails && <SubscriptionDetails />}
				{isShipingInformation && <ShipingInformation user={user} />}
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
