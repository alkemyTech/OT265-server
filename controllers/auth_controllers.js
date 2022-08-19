const db = require('../models/index');
const User = db.User;
const bcryptjs = require('bcryptjs');

const register = async (req, res) => {
	let { firstName, lastName, email, password } = req.body;

	//Encriptar la PW:
	const salt = bcryptjs.genSaltSync();	
	password = bcryptjs.hashSync(password, salt);

	//Guardar en DB:
  const newUser = await User.create({
    firstName,
    lastName,
    email,
		password
  })

	res.status(201).json({
    msg: "Usuario creado con exito.",
    firstName,
    lastName,
		email
  })
}

module.exports = {
	register
}