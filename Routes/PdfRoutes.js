const express = require("express");
const router = express.Router();
const controller = require("../controllers/pdfController");

router.post("/single", controller.singlePDF);
router.post("/range", controller.rangePDF);

module.exports = router;
