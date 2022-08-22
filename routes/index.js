var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const isAuthenticated = require( '../middlewares/isAuthenticated' );


router.get('/jwt', [ isAuthenticated ], (req, res) => {

  res.json({
    data: "paso OK"
  })
})

module.exports = router;
