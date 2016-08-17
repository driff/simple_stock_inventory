var app = angular.module('productsApp', []);

app.controller('mainController', function($scope){
  $scope.products = [];
  $scope.newProduct = {name: '', rawMaterial: true, info: '', quantity: '', lastUpdated:Date.now()};

  $scope.post = function(){
    console.log('post!');
    $scope.products.push($scope.newProduct);
    $scope.newProduct = {name: '', rawMaterial: true, info: '', quantity: '', lastUpdated:Date.now()};
  }
  $scope.showActions = function(product){
        $scope.selected = product;
        console.log("asd");
  };
});
