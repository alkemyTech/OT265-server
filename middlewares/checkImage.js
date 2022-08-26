module.exports = {
    checkImage: (req, res, next) => {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'The image is required.',
                        param: 'image',
                        location: 'files'
                    }
                ]
            })
        }

        next();
    }
}