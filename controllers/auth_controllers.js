const db = require('../models/index');
const User = db.User;
const bcryptjs = require('bcryptjs');
const { generateAccessToken } = require('../helpers/jwt.js')


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
//Controller de Login
const login = async( req,res )=>{

  const { email, password} = req.body;

  try{
    const user = await User.findOne( { where : { email }} )

    if( !user ){
      return res.status(400).json({
        msg:"User not found"
      })
    }

    //Comparar password
    const validPassword = bcryptjs.compareSync( password, user.password)

    if( !validPassword ){
      return res.status(409).json({
        msg:"Invalid Password"
      })
    }

    //Generar Token
    const token = await generateAccessToken( user.id )
    res.json({
      msg: "Login Ok",
      user,
      token
    })

  } catch ( error ){
    console.log( error )
    return res.status(500).json({
      msg: "Contact the Administrator",
    })
  }
  
  
}

module.exports = {
  register,
  login
}

