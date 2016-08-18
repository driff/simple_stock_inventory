var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

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
  //creates a new product
  .post(function(req, res){
    var product = new Product();
    product.name = req.body.name;
    product.details = req.body.details;
    product.quantity = req.body.quantity;
    product.raw_material = req.body.raw_material;
    product.save(function(err, product){
      if(err){
        return res.send(500, err);
      }
      return res.json(product);
    }); 
  })

  //gets all products
  .get(function(req, res){
    Product.find(function(err, products){
      if(err){
        return res.send(500, err);
      }
      return res.send(200, products);
    });
  });

router.route('/products/:id')

  //updates specified product
  .put(function(req, res){
    Product.findById(req.params.id, function(err, product){
      if(err){
        res.send(err);
      }
      product.name = req.body.name;
      product.details = req.body.details;
      product.quantity = req.body.quantity;
      product.raw_material = req.body.raw_material;
      product.last_updated = Date.now();
      product.save(function(err, product){
        if(err){
          res.send(err);
        }
        res.json(product);
      });
    });
  })

  //gets specified product
  .get(function(req, res){
    Product.findById(req.params.id, function(err, product){
      if(err){
        res.send(err);
      }
      res.json(product);
    });
  })

  //delets the product
  .delete(function(req, res){
    Product.remove({
      _id: req.params.id
    }, function(err){
      if(err){
        res.send(err);
      }
      res.json("deleted!");
    });
  });


module.exports = router;
