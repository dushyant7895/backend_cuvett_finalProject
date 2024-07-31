const express = require("express");
const router = express.Router();


const{createNewFolder,getAllFolders,deletePerticularFolder,getFoldersForUser,fetchFolderId}=require("../controllers/folderControler")

const{auth}=require("../middlewares/auth")



router.post("/createfolder/:id",auth, createNewFolder);


router.get("/getfolders",auth, getAllFolders);


router.delete("/deletefolder/:id",auth, deletePerticularFolder);

router.get('/user/:userId', getFoldersForUser);

router.get('/getfolderid',auth,fetchFolderId)


module.exports = router;