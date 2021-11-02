const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');
module.exports = async (req, res, next) => {
	try {
		console.log(process.env.JWT_SESSION_KEY);
		const token = req.headers.authorization;
		console.log(token);
		const decodedToken = jwt.verify(token, process.env.JWT_SESSION_KEY || 'secret');
		const authId = decodedToken._id;
		const authObj = await Auth.findById(authId).exec();
		console.log('approved', authObj);
		req.user = authObj;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({
			message: 'Auhorization error! please send a valid token via authorization header!',
		});
	}
};
