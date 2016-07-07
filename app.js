var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/intro',
        })
        .when('/intro', {
            templateUrl: 'Templates/Intro.html',
        })
        .when('/maingame', {
            controller: 'TriviaControl',
            templateUrl: 'Templates/MainGame.html',
        })
        .when('/newgame', {
            templateUrl: 'Templates/EndGame.html',
        })
}]);
app.controller('TriviaControl',['GameFactory','$scope',function(GameFactory,$scope){
$scope.showQuestion = function(){
  GameFactory.trivia().then(function(){
    let data = response.data[0]
    $scope.toanswer.answer = data.answer;
    $scope.trivia.question= data.question;
    console.log(data)
  });
}

//I was trying to get rid of doubles but couldnt figure it out.
$scope.compareAnswer = function(){
  if($scope.userAnswer === $scope.toanswer.answer){
    GameFactory.trivia()
    }
    else if($scope.userAnswer !== $scope.toanswer.answer){
        $scope.incorrect.push({answer:$scope.userAnswer});
    }
    $scope.showQuestion()
  };
$scope.showCategory = function(){
  $scope.categories = [{}]
  GameFactory.category($scope.categories)
}
$scope.showCategory()
}]);
app.factory('GameFactory', ['$http',function($http){
  let correct =[]
  let incorrect = []
  let toanswer = []
  let trivia = []
  let value = 0
  let score = 0
  let categories=[]
  var gettrivia = function(){
    console.log('trivia')
    return $http({
    method:'GET',
    url: 'http://jservice.io/api/random',
  }).then(function(response){
      let data= response.data[0]
      value= data.value;
      score = score + data.value;
      correct.push({
      answer: data.answer,
      value : data.value
    });
  })
};
  var getcategory = function(som){
      var disposable = []
    return $http({
      method:'GET',
      url:'http://jservice.io/api/categories?count=6',
    }).then(function(response){
    response.data.forEach(function(el){
        som.push({title:el.title})
        disposable.push(el)
      });
      angular.copy(disposable, categories);
       console.log(categories)
    })
  };
  return {
    trivia : gettrivia,
    category: getcategory,
  }
}]);
