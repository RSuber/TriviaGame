(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    redirectTo: '/Templates/Intro.html'
  }).when('/intro', {
    controller: 'TriviaControl',
    templateUrl: 'Templates/Intro.html'
  }).when('/maingame', {
    controller: 'TriviaControl',
    templateUrl: 'Templates/MainGame.html'
  }).when('/newgame', {
    controller: 'TriviaControl',
    templateUrl: 'Templates/EndGame.html'
  });
}]);
app.controller('TriviaControl', function ($scope, $http) {
  $scope.correct = [{}];
  $scope.incorrect = [{}];

  $scope.doubles = [{}];

  $scope.toanswer = [{}];

  $scope.trivia = [{}];
  $scope.lastQuestion = [{}];
  $scope.userAnswer = '';
  $scope.score = 0;
  $scope.value = 0;
  $scope.showQuestion = function () {
    $http({
      method: 'GET',
      url: 'http://jservice.io/api/random'
    }).then(function (response) {
      var data = response.data[0];
      $scope.toanswer.answer = data.answer;
      $scope.trivia.question = data.question;
      console.log(data);
    });
  };
  //I was trying to get rid of doubles but couldnt figure it out.
  $scope.compareAnswer = function () {
    if ($scope.userAnswer === $scope.toanswer.answer) {
      $http({
        method: 'GET',
        url: 'http://jservice.io/api/random'
      }).then(function (response) {
        var data = response.data[0];
        $scope.value = data.value;
        $scope.score = $scope.score + data.value;
        $scope.correct.push({
          answer: $scope.toanswer.answer,
          value: $scope.value
        });
      });
    } else if ($scope.userAnswer !== $scope.toanswer.answer) {
      $scope.incorrect.push({ answer: $scope.userAnswer });
    }
    $scope.showQuestion();
  };
});
},{}]},{},[1])