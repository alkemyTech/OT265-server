const fs = require('fs');

const decodeBase64Image = async (req, res, next) => {
  const { imageString } = req.body
  var matches = imageString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

  if (matches.length !== 3) {
    throw new Error({
      success: false,
      message: 'Invalid input string'
    });
  }
  type = matches[1].split('/');
  if (type[0] !== "image") throw new Error({
    success: false,
    message: "Wrong file type"
  });
  data = Buffer.from(matches[2], 'base64');
  // req.files.image = fs.writeFile(`imagen.${type[1]}`, data);
  fs.writeFile(`images/image.${type[1]}`, data, (err) => {
    if (err) {
      return res.status(400).send({
        error: true,
        message: err.message
      })
    } else {
      console.log('Image created');
      next()
    }
  })
}

module.exports = { decodeBase64Image };