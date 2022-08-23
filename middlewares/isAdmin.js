const db = require('../models/index');
const Role = db.Role;

module.exports = {

    isAdmin: async (req, res) => {
        if(!req.userAuth) {
            return res.status(500).json({
                ok: false,
                msg: 'The token must be verified first.'
            })
        }

        const { roleId } = req.userAuth;
        const { name } = await Role.findByPk(roleId);

        if (name !== 'Admin') {
            return res.status(401).json({
                ok: false,
                msg: "You don't have permissions for this request."
            })
        }

        next();
        
    }

}