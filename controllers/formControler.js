const User = require("../Models/UserModel");
const Form = require("../Models/FormModel");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

exports.createForm = async (req, res) => {
  try {
    const { formname, folderId, theme, fields } = req.body;
    const userId = req.user.userId;
    const uniqueUrl = uuidv4();

    const newForm = new Form({
      formname,
      userId,
      folderId: folderId || null,
      theme,
      views: 0,
      starts: 0,
      completionrate: 0,
      fields,
      uniqueUrl,
    });

    await newForm.save();
    res.status(201).json({
      status: true,
      message: "Form created successfully",
      form: newForm,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: true, message: "Server error", error: error.message });
  }
};

exports.retrieveForm = async (req, res) => {
  try {
    const { formId } = req.params;

    let form;
    if (mongoose.Types.ObjectId.isValid(formId)) {
      form = await Form.findById(formId);
    } else {
      form = await Form.findOne({ uniqueUrl: formId });
    }

    if (form) {
      res.status(200).json({
        success: true,
        message: "Form retrieved successfully",
        form,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving form",
    });
  }
};

exports.removeForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res
      .status(201)
      .json({ status: true, message: "Form successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Error deleting form", error });
  }
};

exports.getFormsByFolderId = async (req, res) => {
  try {
    const { folderId } = req.params;
    const forms = await Form.find({ folderId });
    if (!forms) {
      return res
        .status(500)
        .json({ status: false, message: "Forms not found" });
    }
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getFormsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const forms = await Form.find({ userId: userId });
    if (!forms) {
      return res
        .status(404)
        .json({ status: false, message: "Forms not found" });
    }
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ status: false, message: "Unable to get form" });
  }
};
exports.modifyTheme = async (req, res) => {
  try {
    const { formId } = req.params;
    const { theme } = req.body;

    let form;
    if (mongoose.Types.ObjectId.isValid(formId)) {
      form = await Form.findByIdAndUpdate(formId, { theme }, { new: true });
    } else {
      form = await Form.findOneAndUpdate(
        { uniqueUrl: formId },
        { theme },
        { new: true }
      );
    }

    if (!form) {
      return res.status(404).send({ status: false, message: "Form not exist" });
    }

    res.send(form);
  } catch (error) {
    res
      .status(500)
      .send({ status: false, message: "Error occur when update theme" });
  }
};


exports.retrieveFormByUniqueUrl = async (req, res) => {
  try {
    const { uniqueUrl } = req.params;
    const form = await Form.findOne({ uniqueUrl });
    if (!form) {
      return res.status(500).json({
        status: false,
        message: "Form not found",
      });
    }
    res.status(200).json({ status: true, form });
  } catch (error) {
    res
      .status(500)
      .json({ status: true, message: "Error occur when fetch url", error });
  }
};





exports.modifyForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { formname, folderId, theme, fields } = req.body;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ status: true, message: "Invalid Form ID" });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      {
        formname,
        folderId: folderId || null,
        theme,
        fields,
      },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(500).json({ status: false, message: "Form not found" });
    }

    res
      .status(200)
      .json({
        status: true,
        message: "Form updated successfully",
        updatedForm,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
