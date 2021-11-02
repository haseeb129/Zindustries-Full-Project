const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');
const Payment = require('../models/payment');
const Role = require('../models/roles');
const saltRounds = 10;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.user,
		pass: process.env.pass,
	},
});

module.exports.signup = (req, res, next) => {
	console.log(req.body);
	const { firstName, lastName, companyName, password, email } = req.body;
	var hashp;
	Auth.findOne({ email: email })
		.exec()
		.then(async (authObj) => {
			if (authObj) {
				res.status(403).json({
					message: 'Email already registered',
				});
			} else {
				await bcrypt.hash(password, saltRounds, function (err, hash) {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						hashp = hash;
						userObject = {
							password: hash,
							email: email,
							firstName: firstName,
							lastName: lastName,
							companyName: companyName,
							profilePic: '',
							startedAt: new Date().toDateString(),
							modelDownloaded: 0,
						};

						// const auth = new Auth({
						//   password: hash,
						//   email: email,
						//   firstName: firstName,
						//   lastName: lastName,
						//   companyName: companyName,
						//   profilePic: "",
						// });

						// auth
						//   .save()
						//   .then(async (result) => {
						//     console.log("User object Saved", result);
						//     const token = jwt.sign(
						//       {
						//         _id: result._id,
						//         password: hash,
						//         email: email,
						//         firstName: firstName,
						//         lastName: lastName,
						//         companyName: companyName,
						//         profilePic: result.profilePic,
						//       },
						//       "secret",
						//       { expiresIn: "5d" }
						//     );
						//     console.log("Result", result);
						//     console.log("token", token);
						//     res.status(201).json({
						//       message: "sign up successful",
						//       token: token,
						//     });
						//   })
						//   .catch((err) => {
						//     console.log("Not saved");
						//     res.status(500).json({
						//       error: err,
						//     });
						//   });

						res.status(201).json({
							message: 'sign up successful',
							userObject: userObject,
						});
					}
				});
			}
		});
};

module.exports.login = async (req, res, next) => {
	console.log('LogIN', req.body);
	const email = req.body.email;
	const password = req.body.password;

	Auth.findOne({ email: email })
		.exec()
		.then(async (auth) => {
			if (auth) {
				await bcrypt.compare(password, auth.password, async function (err, newResult) {
					if (err) {
						return res.status(501).json({
							error: err,
						});
					} else {
						if (newResult) {
							const { _id, firstName, lastName, companyName, password, email, profilePic } = auth;

							const token = jwt.sign(
								{
									_id,
									firstName,
									lastName,
									companyName,
									password,
									email,
									profilePic,
								},
								'secret',
								{ expiresIn: '5d' },
							);
							return res.status(200).json({
								token: token,
								user: auth,
							});
						} else {
							return res.status(401).json({
								message: 'invalid password',
							});
						}
					}
				});
			} else {
				res.status(404).json({
					message: 'email invalid',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.forgetPassword = (req, res, next) => {
	console.log(req.body);
	const { email } = req.body;

	Auth.findOne({ email: email })
		.exec()
		.then(async (authObj) => {
			if (authObj) {
				console.log('Object Found', authObj);
				const token = jwt.sign(
					{
						_id: authObj._id,
						email: authObj.email,
						firstName: authObj.firstName,
						lastName: authObj.lastName,
						companyName: authObj.lastName,
						profilePic: authObj.profilePic,
					},
					'secret',
					{ expiresIn: '60d' },
				);

				var mailOptions = {
					from: process.env.email,
					to: `${email}`,
					subject: 'Account activation link',
					html: `
                            <h2>please click on the following link to activate your account</h2>
                            <a href="http://192.168.18.9:3001/active/${token}"> ${process.env.CLIENT_URL}/auth/activate/${token} </a>
                            `,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});

				res.status(201).json({
					message: 'please check your email for account activation',
				});
			} else {
				res.status(403).json({
					message: 'Email Not found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.updatePassword = (req, res, next) => {
	console.log('request received', req.body);
	const id = req.body._id;
	const password = req.body.password;
	Auth.findById(id)
		.exec()
		.then(async (foundObject) => {
			console.log('updatePassword', foundObject);
			await bcrypt.hash(password, saltRounds, (err, hash) => {
				if (err) {
					return res.state(500).json({
						error: err,
					});
				} else {
					foundObject.password = hash;
					foundObject
						.save()
						.then(() => {
							res.status(201).json({
								message: 'password updated successfully',
							});
						})
						.catch((err) => {
							res.status(500).json({
								error: err,
							});
						});
				}
			});
		})
		.catch((err) => {
			console.log('Error Occur', err.message);
			res.status(500).json({
				error: err,
			});
		});
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.softThriveEmailClientKey);

module.exports.googleLogin = (req, res) => {
	const { token } = req.body;
	console.log(token);

	client
		.verifyIdToken({
			idToken: token,
			audience: process.env.softThriveEmailClientKey,
		})
		.then((response) => {
			const { email_verified, email, given_name, family_name, picture } = response.payload;

			if (email_verified) {
				Auth.findOne({ email: email })
					.exec()
					.then(async (authObj) => {
						if (authObj) {
							console.log('Object Found', authObj);
							const token = jwt.sign(
								{
									_id: authObj._id,
									email: authObj.email,
									firstName: authObj.firstName,
									lastName: authObj.lastName,
									companyName: '',
									profilePic: authObj.profilePic,
								},
								'secret',
								{ expiresIn: '60d' },
							);
							res.status(201).json({
								message: 'sign up successful',
								token: token,
							});
						} else {
							let newUserobject = {
								email: email,
								firstName: given_name,
								lastName: family_name,
								profilePic: picture,
								password: '123456',
								startedAt: new Date().toDateString(),
								companyName: '',
							};
							console.log('making new user for GOOGLE ', newUserobject);
							res.status(201).json({
								message: 'New User Register',
								userObject: newUserobject,
							});
						}
					})
					.catch((err) => {
						console.log('Token Verificationj Failed', err);
					});
			}

			console.log(response.payload);
		});
};

module.exports.SentEmailToAll = (req, res, next) => {
	const { emailContent } = req.body;

	console.log(`${emailContent}`, req.body);
	console.log('req.files', req.files);

	Auth.find()
		.exec()
		.then(async (subscriberArray) => {
			if (subscriberArray) {
				subscriberArray.map((element) => {
					var mailOptions = {
						from: process.env.email,
						to: `${element.email}`,
						subject: 'Account activation link',
						html: `${emailContent}`,
						attachments: [
							{
								filename: 'change with filename',
								// path: 'C:\\Users\\hasee\\Downloads\\sofa.jpeg',
								path: './uploads/sofa.jpeg',
							},
						],
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
				});

				res.status(201).json({
					message: 'please check your email for account activation',
				});
			} else {
				res.status(403).json({
					message: 'Email Not found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.getAllUsers = async (req, res, next) => {
	console.log('all users');
	Auth.find()
		.populate('modelDownloaded')
		.exec()
		.then(async (users) => {
			if (users.length > 0) {
				let allUsers = [];
				for (let i = 0; i < users.length; i++) {
					let payment = await Payment.findOne({ userId: users[i]._id });

					if (payment) {
						let obj = { ...users[i].toObject(), payment: payment.toObject() };
						allUsers.push(obj);
					}
				}
				console.log(users);
				res.status(200).json({
					users: allUsers,
				});
			}
		})
		.catch((err) => {
			console.log('Mess', err);
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.updateDownloadModel = (req, res, next) => {
	console.log('request received', req.body);
	const { _id, modelId } = req.body;
	Auth.findById(_id)
		.exec()
		.then(async (foundObject) => {
			console.log('updatePassword', foundObject);
			let currentArray = foundObject.modelDownloaded ? foundObject.modelDownloaded : [];
			currentArray = currentArray.push(modelId);
			foundObject.modelDownloaded = currentArray;
			let arr = foundObject.downloadedData ? foundObject.downloadedData : [];
			arr.push({ modelId: modelId, orderId: new mongoose.Types.ObjectId(), date: new Date().toDateString() });
			foundObject.downloadedData = arr;
			console.log('foundObject', foundObject);

			delete foundObject._id;
			Auth.findOneAndUpdate({ _id: _id }, foundObject)
				.then((SavedObject) => {
					console.log('SavedObject', SavedObject);
					res.status(201).json({
						message: 'User Updated successfully',
						SavedObject: SavedObject,
					});
				})
				.catch((err) => {
					console.log('Catch ', err);
					res.status(500).json({
						error: err,
					});
				});

			// foundObject
			//   .save()
			//   .then((result) => {
			//     res.status(201).json({
			//       message: "updated successfully",
			//     });
			//   })
			//   .catch((err) => {
			//     console.log("Error", err);
			//     res.status(500).json({
			//       error: err,
			//     });
			//   });
		})
		.catch((err) => {
			console.log('Error Occur', err.message);
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.updateUserProfile = (req, res, next) => {
	console.log('Req Body', req.body);
	const { _id, firstName, lastName, email, phone, companyName, ocupation, address, aprtment, city, state, zip, country } = req.body;
	let newObject = { firstName, lastName, email, phone, companyName, ocupation, address, aprtment, city, state, zip, country };

	Auth.findOneAndUpdate({ _id: _id }, newObject)
		.then((SavedObject) => {
			res.status(201).json({
				message: 'User Updated successfully',
				SavedObject: SavedObject,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.getuserById = (req, res, next) => {
	const { id } = req.body;
	Auth.findById(id)
		.populate('modelDownloaded')
		.exec()
		.then((user) => {
			res.status(200).json({
				user,
			});
		})
		.catch((err) => {
			console.log('Mess', err);
			res.status(500).json({
				error: err,
			});
		});
};
