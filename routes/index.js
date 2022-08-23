var express = require('express');
const { postRole, getAllRoles } = require('../controllers/role_controllers');
const verifyFile = require('../middlewares/verifyFile');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', [verifyFile()], postRole);
router.get('/', getAllRoles)

module.exports = router;