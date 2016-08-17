'use strict';
var app = angular.module('internationalization', ['pascalprecht.translate']);

app.config(function ($translateProvider){
  $translateProvider.fallbackLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {'en_*':'en', 'es_*':'es'});
  $translateProvider.translation('en', {
    MATERIALS_TITLE: "Materials List",
    MATERIALS_TEXT1: "TEXT1!1!!",
    MATERIALS_TEXT2: "TEXT2!!!!"
  });
  $translateProvider.translation('es', {
    MATERIALS_TITLE: "Lista de Materiales",
    MATERIALS_TEXT1: "Texto 1",
    MATERIALS_TEXT2: "Texto 2"
  });
  $translateProvider.useSanitazeValuesStrategy('escape');
  $translateProvider.preferredLanguage('en');  
});

app.controller('Ctrl', function($scope, $translate){
  $scope.changeLanguage = function(key){
    $translate.use(key);;
  };
});
