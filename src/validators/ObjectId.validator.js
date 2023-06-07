const mongoose = require("mongoose");

const ObjectId = (req, res, next) => {
  const isObjectId = mongoose.Types.ObjectId.isValid(req.params._id);
  console.log(`ObjectId=${req.params._id}`)
  if (!isObjectId) {
    console.log("invalid id");
    return res.status(400).json({
      success: false,
      message: "invalid id",
    });
  }
  next()
};

module.exports = ObjectId;
