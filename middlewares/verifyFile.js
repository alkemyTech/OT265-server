const verifyFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).lenght === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'There are no files to upload.' });
    }

    next();
}

module.exports = {
    verifyFile
}