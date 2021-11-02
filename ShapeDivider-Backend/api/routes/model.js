const express = require("express");
const router = express.Router();
const modelController = require("../controllers/model");
const ImageServices = require("../ImageServices");

router.get("/getAllModels", modelController.getAllModels);
router.post(
  "/addModel",
  ImageServices.upload.single("modelImage"),
  modelController.addModel
);
router.delete(
  "/deleteModel/:id",
  ImageServices.upload.single("modelImage"),
  modelController.deleteModel
);

router.patch(
  "/updateModel",
  ImageServices.upload.single("modelImage"),
  modelController.updateModel
);
module.exports = router;
