function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

  if (matches.length !== 3) {
    throw new Error({
      success: false,
      message: 'Invalid input string'
    });
  }
  type = matches[1].split('/');
  data = Buffer.from(matches[2], 'base64');
  if (type[0] !== "image") throw new Error({
    success: false,
    message: "Wrong file type"
  });
  console.log("Here be data", data)
  let response = data + '.' + type[1];

  return response;
}

module.exports = { decodeBase64Image };