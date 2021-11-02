const Model = require('../models/model');
const path = require('path');
const ImageServices = require('../ImageServices');

module.exports.getAllModels = (req, res, next) => {
	Model.find()
		.exec()
		.then((models) => {
			res.status(200).json({
				models,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};
module.exports.addModel = (req, res, next) => {
	console.log('Req Body', req.body);
	const { name, description, ticket, modelImage, modelId, modelInstruction, category } = req.body;
	const newModel = new Model({
		name,
		description,
		ticket,
		modelId,
		modelInstruction,
		category,
		modelImage: req.file.path,
	});

	newModel
		.save()
		.then((SavedObject) => {
			res.status(201).json({
				message: 'Model saved successfully',
				SavedObject: SavedObject,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.deleteModel = async (req, res) => {
	const id = req.params.id;
	console.log('Id,', id);
	Model.findByIdAndRemove({ _id: id })

		.then(async (result) => {
			if (result) {
				console.log('Result', result);
				await ImageServices.removeImagefile(result.modelImage);
			}
			await res.status(200).json({ message: 'Delete Success' });
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
};

module.exports.updateModel = (req, res, next) => {
	console.log('Req Body', req.body);
	const { _id, name, description, ticket, modelId, modelInstruction, category } = req.body;
	let newObject = {};
	if (req.file) {
		newObject = {
			name,
			description,
			ticket,
			modelId,
			modelInstruction,
			category,
			modelImage: req.file.path,
		};
	} else {
		newObject = {
			name,
			description,
			ticket,
		};
	}

	Model.findOneAndUpdate({ _id: _id }, newObject)
		.then((SavedObject) => {
			res.status(201).json({
				message: 'Model saved successfully',
				SavedObject: SavedObject,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};
