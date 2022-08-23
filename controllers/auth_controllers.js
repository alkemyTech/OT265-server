const db = require('../models/index');
const User = db.User;
const bcryptjs = require('bcryptjs');

const generateAccessToken = require('../helpers/jwt.js')

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

  //Generar JWT para loggear al usuario luego de que se registre:
  const accessToken = generateAccessToken(newUser);

  res.status(201).json({
    msg: "Usuario creado con exito.",
    user: {
      firstName,
      lastName,
      email
    },
    accessToken
  })
}

module.exports = {
  register
}
