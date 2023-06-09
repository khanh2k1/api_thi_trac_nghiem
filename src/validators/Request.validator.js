const requestValidator = (schema, property) => {
  return (req, res, next) => {

    
    const object = req[property]
    const { error } = schema.validate(object);
    
    if (!error) {
      next();
      return; // next() thì cho thông chốt thôi nhưng nếu không dừng lại thì nó vẫn chạy tiếp xuống dưới
    }
    console.log('error validate: ', error['details'][0]['message'])
    // console.log(JSON.stringify(message, null, 2))
    res.status(422).json({
      success: false,
      message: error['details'][0]['message']
    });
  };
};

module.exports = requestValidator;
