const db = require("../models/index");
const User = db.User;
const bcryptjs = require("bcryptjs");
const { generateAccessToken } = require("../helpers/jwt.js");

const register = async (req, res) => {
  let { firstName, lastName, email, password, roleId, image } = req.body;

  //Encriptar la PW:
  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);

  //Guardar en DB:
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    image,
    roleId,
  });

  //Generar JWT para loggear al usuario luego de que se registre:
  const token = await generateAccessToken(newUser.id);

  res.status(201).json({
    msg: "Usuario creado con exito.",
    token,
  });
};
//Controller de Login
const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    //Comparar password
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(409).json({
        msg: "Invalid Password",
      });
    }

    //Generar Token
    const token = await generateAccessToken(user.id);
    res.json({
      msg: "Login Ok",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const dataUserAuth = async (req, res, next) => {
  const { userAuth } = req;

  res.status(200).json({
    ok: true,
    data: userAuth,
  });
};

module.exports = {
  register,
  login,
  dataUserAuth,
};
