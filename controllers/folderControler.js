const mongoose = require("mongoose");
const Folder = require("../Models/FolderModel"); // Ensure the correct path to your Folder model
const User = require("../Models/UserModel");

exports.createNewFolder = async (req, res) => {
  try {
    const { foldername } = req.body;
    const user = req.user.userId;

    if (!foldername) {
      return res.status(401).json({
        status: false,
        message: "Please, Enter folder name",
      });
    }

    // Check if the folder already exists
    const checkFolder = await Folder.findOne({ foldername, user });
    if (checkFolder) {
      return res.status(401).json({
        status: false,
        message: "Folder already exists",
      });
    }

    const createFolder = new Folder({ foldername, user });
    await createFolder.save();

    res.status(201).json({
      success: true,
      message: "New folder created successfully",
      folder: createFolder,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Something went wrong when creating folder",
      error,
    });
  }
};

exports.getAllFolders = async (req, res) => {
  try {
    const allFolder = await Folder.find({});
    res.status(200).json({
      status: true,
      message: "Got All folder successfully",
      allFolder,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error for not fetch any folders",
      error,
    });
  }
};


exports.deletePerticularFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const checkFolder = await Folder.findByIdAndDelete(id);
    if (!checkFolder) {
      return res.status(500).json({
        status: false,
        message: "Folder not exist",
      });
    }
    res
      .status(200)
      .json({ status: true, message: "Folder Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occur when deleting the folder",
      error,
    });
  }
};

exports.getFoldersForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(500).json({ status: false, message: "User Not Exist" });
    }

    const getFolder = await Folder.find({ user: userId });

    res.status(200).json(getFolder);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Error Occur when get Folder", error });
  }
};

exports.fetchFolderId = async (req, res) => {
  try {
    let folder = await Folder.findOne({ userId: req.user.userId });
    if (!folder) {
      folder = new Folder({ name: "Default Folder", userId: req.user.userId });
      await folder.save();
    }
    res.json({ folderId: folder._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching folder ID", error: error.message });
  }
};
