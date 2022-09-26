const fs = require('fs');

const decodeBase64Image = async (req, res, next) => {
  const { imageString, organizationId } = req.body
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
  
  req.files = fs.writeFile(`images/organization${organizationId}.${type[1]}`, data, (err) => {
    if (err) {
      return res.status(400).send({
        error: true,
        message: err.message
      })
    } else {
      console.log('Image created');
      console.log("matches",matches[3])
      next()
    }
  })

}

module.exports = { decodeBase64Image };