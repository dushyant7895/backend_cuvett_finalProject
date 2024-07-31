const express = require("express");
const router = express.Router();
const { storeResponse, fetchFormResponses } = require("../controllers/fetchResponse");

router.get('/form/:formId/responses', fetchFormResponses);  
router.post('/saveResponse/:uniqueUrl', storeResponse); 

module.exports = router;
