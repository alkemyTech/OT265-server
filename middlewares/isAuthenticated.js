const jwt = require('jsonwebtoken');
const { request: req, response: res } = require('express');
//models:
const db = require('../models/index');
const User = db.User;

const isAuthenticated = async (req, res, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(403).json({
			error: "No envio un token valido."
		})
	}

	try {

		const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		req.id = id;
		req.userAuth = await User.findByPk(id)

		if (!req.userAuth) {
			return res.status(403).json({
				error: "No envio un token valido. Usuario no existente."
			})
		}

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			error: "No envio un token valido."
		})
	}
}

module.exports = isAuthenticated;