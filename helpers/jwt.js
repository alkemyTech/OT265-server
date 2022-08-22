const jwt = require('jsonwebtoken')


const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
    return { token: "Bearer " + accessToken }
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
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
        let parseUser = {
            name: user.name,
        }
        next()
    })
}

const getUserFromToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
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
        const parseUser = {
            _id: user.id,
            role: user.role,
            usarname: user.username
        }
    })
    return parseUser;
}


module.exports = {
    generateAccessToken,
    authenticateToken,
    getUserFromToken
}
