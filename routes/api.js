var express = require('express');
var router = express.Router();

function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/products', isAuthenticated);

router.route('/products')

  .post(function(req, res){
    res.send({message:"TODO create a new product in db"});
  })

  .get(function(req, res){
    res.send({message:"TODO get all the products in the db"});
  });

router.route('/products/:id')

  //create
  .put(function(req, res){
    return res.send({message:'TODO Modify existing product by using param '+req.param.id});
  })

  .get(function(req, res){
    return res.send({message:'TODO get an existing product by using id param '+req.param.id});
  })

  .delete(function(req, res){
    return res.send({message:'TODO delete an existing product with the id '+req.param.id});
  });


module.exports = router;
