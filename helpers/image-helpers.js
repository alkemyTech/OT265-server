const decodeBase64Image = async (imageString) => {
  var matches = imageString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    throw new Error({
      success: false,
      message: "Invalid input string",
    });
  }
  type = matches[1].split("/");
  if (type[0] !== "image")
    throw new Error({
      success: false,
      message: "Wrong file type",
    });
  data = Buffer.from(matches[2], "base64");

  return { imageType: type[1], data };
};

module.exports = { decodeBase64Image };
