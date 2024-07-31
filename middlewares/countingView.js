const Form = require('../Models/FormModel');

const countingView = async (req, res, next) => {
  if (req.viewCountUpdated) {
    return next();
  }

  const { uniqueUrl } = req.params;



  try {
    const form = await Form.findOne({ uniqueUrl });

    if (form) {
      form.views += 1;
      await form.save();
      
      req.viewCountUpdated = true; 
    }

    next();
  } catch (error) {
    
    next(error);
  }
};

module.exports = countingView;
