const mongoose = require("mongoose");
const Response = require("../Models/ResponseModel");
const Form = require("../Models/FormModel");


exports.fetchFormResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ formId });

    if (!responses) {
      return res
        .status(500)
        .json({ status: false, message: "No responses found" });
    }
    if (responses.length === 0) {
      return res
        .status(500)
        .json({ status: false, message: "No responses found" });
    }

    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.storeResponse = async (req, res) => {
  try {
    const { uniqueUrl } = req.params;
    const responses = req.body;

    const form = await Form.findOne({ uniqueUrl });
    if (!form) {
      return res
        .status(404)
        .json({ status: false, message: "Unable to ftech form" });
    }

    const fetchResponse = new Response({
      formId: form._id,
      responses,
      submittedAt: new Date(),
    });

    await fetchResponse.save();
    res.status(201).json({ status: true, message: "Data stored successfully" });
  } catch (error) {
    console.error("Error during response storage:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


