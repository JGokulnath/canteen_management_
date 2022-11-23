const upload = require("../middleware/uploadFiles");

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.body);
    if (req.file == undefined) {
      return res.status(200).send({
        message: "You must select a file.",
      });
    }
    return res.status(200).send({
      message: "File has been uploaded.",
    });
  } catch (err) {
    console.log(err);
    return res.send({
      message: "Error when trying upload image",
    });
  }
};

module.exports = {
  uploadFiles,
};
