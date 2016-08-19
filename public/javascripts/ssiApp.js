var app = angular.module('ssiApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http){
  $rootScope.authenticated = false;
  $rootScope.currentUser = '';

  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.currentUser = '';
  };
});

app.config(function($routeProvider){
  $routeProvider
  //products display
  .when('/', {
    templateUrl: 'products.html',
    controller: 'mainController'
  })
  //login display
  .when('/login', {
    templateUrl: 'login.html',
    controller: 'authController'
  })
  //signup display
  .when('/signup', {
    templateUrl: 'register.html',
    controller: 'authController'
  });
});

app.filter('true_false', function() {
  return function(text, length, end) {
    if (text) {
      return 'Yes';
    }
    return 'No';
  }
});

//factory that takes care of all the REST functions
app.factory('postService', function($resource){
  return $resource('/api/products/:id');
});

app.controller('mainController', function(postService, $scope, $rootScope){
  $scope.products = postService.query();
  $scope.newProduct = {name: '', raw_material: '', details: '', quantity: '',created_at: '', last_updated:''};

  $scope.post = function(){
    $scope.newProduct.created_at = Date.now();
    $scope.newProduct.last_updated = Date.now();
    $scope.newProduct.raw_material = ($scope.newProduct.raw_material === '' 
          || $scope.newProduct.raw_material === false) ? false: true;
    postService.save($scope.newProduct, function(){
      $scope.products = postService.query();
      $scope.newProduct = $scope.newProduct = 
      {name: '', 
      raw_material: '', 
      details: '', 
      quantity: '', 
      created_at:'', 
      last_updated:''};
    });
  };

  // $scope.showActions = function(product){
  //       $scope.selected = product;
  //       console.log("asd");
  // };
});

app.controller('authController', function($scope, $rootScope, $http, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});