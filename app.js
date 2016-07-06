var app = angular.module('myApp', []);

app.controller('TriviaControl',function($scope,$http){
  $scope.correct = [{
    // answer:''
  }];

  $scope.incorrect = [{
    // answer:''
  }];

  $scope.doubles = [{
    // answer:''
  }]

  $scope.toanswer =[{
    // answer:''
  }];

  $scope.trivia =[{
    // question:''
  }];
  $scope.lastQuestion=[{

  }]
  $scope.userAnswer =''
  $scope.score = 0
  $scope.value = 0
$scope.showQuestion = function(){
  $http({
    method:'GET',
    url: 'http://jservice.io/api/random',
  }).then(function(response){
    let data = response.data[0]
    $scope.toanswer.answer = data.answer;
    $scope.trivia.question= data.question;
    console.log(data)

  });
}
//I was trying to get rid of doubles but couldnt figure it out.
$scope.compareAnswer = function(){
  if($scope.userAnswer === $scope.toanswer.answer){
    $http({
      method:'GET',
      url: 'http://jservice.io/api/random',
    }).then(function(response){
      let data= response.data[0]
       $scope.value = data.value;
      $scope.score = $scope.score + data.value;
      $scope.correct.push({
        answer: $scope.toanswer.answer,
        value : $scope.value
      });
    })
    }
    else if($scope.userAnswer !== $scope.toanswer.answer){
        $scope.incorrect.push({answer:$scope.userAnswer});
    }
    $scope.showQuestion()
  };
});
