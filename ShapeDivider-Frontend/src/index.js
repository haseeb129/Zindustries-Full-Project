// React Required
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// Create Import File
import './index.scss';

// Home layout

import Home from './home/Home';
// import Gmail from "./elements/Gmail";
import SDViewer from './elements/SDViewer';
// Element Layout
import Products from './elements/Products';
import About from './elements/About';
import Resources from './elements/Resources';
import Contact from './elements/Contact';

import NewpaymentPage from './elements/NewpaymentPage';
import TextEditor from './elements/TextEditor';
// import Subscription from './home/Subscriptionform';

// Blocks Layout

import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import * as serviceWorker from "./serviceWorker";
import AdminLogin from './elements/adminPanel/AdminLogin';

import loginNew from './elements/loginNew';
import signUpNew from './elements/signUpNew';
import Drawer from './elements/Admin/Drawer';
import UpdateModel from './elements/Admin/components/EditModelPage';
import Customer from './elements/CustomerPanel/Drawer';
class Root extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />

					<Route exact path={`${process.env.PUBLIC_URL}/new`} component={NewpaymentPage} />

					<Route exact path={`${process.env.PUBLIC_URL}/adminlogin`} component={AdminLogin} />

					<Route exact path={`${process.env.PUBLIC_URL}/editor`} component={TextEditor} />

					<Route exact path={`${process.env.PUBLIC_URL}/sdviewer`} component={SDViewer} />
					{/* <Route exact path={`${process.env.PUBLIC_URL}/subscript`} component={Subscription} /> */}
					{/* <Route
            exact
            path={`${process.env.PUBLIC_URL}/login`}
            component={Login}
          /> */}

					<Route exact path={`${process.env.PUBLIC_URL}/login`} component={loginNew} />
					{/* <Route exact path={`/signup`} component={SignUp} /> */}

					<Route exact path={`/signup`} component={signUpNew} />

					<Route exact path={`${process.env.PUBLIC_URL}/products`} component={Products} />

					<Route exact path={`${process.env.PUBLIC_URL}/contact`} component={Contact} />
					<Route exact path={`${process.env.PUBLIC_URL}/resources`} component={Resources} />
					<Route exact path={`${process.env.PUBLIC_URL}/about`} component={About} />

					<Route exact path={`${process.env.PUBLIC_URL}/adminpanel`} component={Drawer} />
					<Route exact path={`${process.env.PUBLIC_URL}/updateModel`} component={UpdateModel} />

					<Route exact path={`${process.env.PUBLIC_URL}/customerpanel`} component={Customer} />
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
// serviceWorker.register();
