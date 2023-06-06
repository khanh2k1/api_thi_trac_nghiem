const mongoose = require("mongoose");

const ObjectId = (req, res, next) => {
  const isObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isObjectId) {
    console.log("invalid id");
    return res.status(400).json({
      success: false,
      message: "invalid id exam",
    });
  }
  next()
};

module.exports = ObjectId;
