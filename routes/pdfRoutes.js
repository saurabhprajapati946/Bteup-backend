const express=require("express");
const router=express.Router();
const c=require("../controllers/pdfController");
router.post("/single",c.singlePDF);
router.post("/range",c.rangePDF);
module.exports=router;
