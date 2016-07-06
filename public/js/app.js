(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = angular.module('myApp', []);

app.controller('TriviaControl', function ($scope, $http) {
  $scope.answered = [{ answer: 'POOPY' }];

  $scope.toanswer = [{ answer: 'asdf' }];

  $scope.trivia = [{
    question: 'poop'
  }];

  $scope.userAnswer = '';

  $scope.showQuestion = function () {
    $http({
      method: 'GET',
      url: 'http://jservice.io/api/random'
    }).then(function (response) {
      var data = response.data[0];
      $scope.toanswer.answer = data.answer;
      $scope.trivia.question = data.question;
      $scope.answered.push({ answer: $scope.toanswer.answer });
      console.log($scope.answered);
    });
  };
  $scope.compareAnswer = function () {
    console.log();
  };
});
},{}]},{},[1])