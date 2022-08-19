const db = require('../models/index');
const User = db.User;

//Verificar si el correo ya existe en la DB:
const emailExists = async (email = '') => {
	const emailExist = await User.findOne({
		where: { email }
	})
	if (emailExist) {
		throw new Error(`El email ${email} ya esta registrado.`)
	}
}

module.exports = {
	emailExists
}