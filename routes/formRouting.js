const express = require("express");
const router = express.Router();

const { createForm, retrieveForm, removeForm, getFormsForUser, retrieveFormByUniqueUrl, getFormsByFolderId, modifyTheme ,modifyForm} = require("../controllers/formControler");
const countingView = require("../middlewares/countingView"); 
const { auth } = require("../middlewares/auth");

router.post("/saveform", auth, createForm);
router.delete("/deleteform/:id", auth, removeForm);
router.get('/user/:userId', getFormsForUser);
router.get("/fetchform/:formId", retrieveForm);
router.get('/folder/:folderId', getFormsByFolderId);
router.put("/updateform/:formId", auth, modifyForm);
router.put('/updateTheme/:formId', auth, modifyTheme);
router.get('/fetchByUniqueUrl/:uniqueUrl', countingView, retrieveFormByUniqueUrl);

module.exports = router;
