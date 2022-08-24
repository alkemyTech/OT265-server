const jwt = require('jsonwebtoken')

// Esta función debe ser incertada en la ruta de login, después de confirmar
// que la información que venga por body sea correcta.

const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
    return { token: "Bearer " + accessToken }
}

//Este es el middleware para autenticar el usuario y prevenir el acceso a rutas protegidas
//Va a ser necesario hacer checkeos extras una vez autenticado el token,
//como extraer el rol del usuario ó lo que fuere

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.status(401).send({
        success: false,
        message: "missing token"
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({
            success: false,
            message: "Wrong credentials"
        })
        req.user = user; //Esta linea está asignando AL USER ENTERO EN {req.user}.
        //No se que datos son necesarios guardar asi que la dejo asi.
        next()
    })
}

// Este middleware hace lo mismo que el de autenticación pero retorna los datos de el user
// en caso de ser necesario.

const getUserFromToken = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.status(401).send({
        success: false,
        message: "missing token"
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({
            success: false,
            message: "Wrong credentials"
        })
        return {
            _id: user.id,
            role: user.role,
            usarname: user.username
        }
    })

}


module.exports = {
    generateAccessToken,
    authenticateToken,
    getUserFromToken
}