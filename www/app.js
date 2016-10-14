var app = angular.module('screenerApp', []);

app.controller('mainCtrl', mainController);

mainController.$inject = ['$scope', '$http'];

function mainController($scope, $http) {

  $scope.screenshots = [];
  $scope.path = '';

  $scope.refresh = function() {
    $http.get('/refresh').then(function(response) {
      console.log($scope.screenshots, response.data.items)
      if ($scope.screenshots.length == response.data.items.length) {
        Materialize.toast('Screenshots already up to date!', 4000);
      } else {
        Materialize.toast('Screenshots updated!', 4000);
      }
      $scope.screenshots = response.data.items;
      // findTags($scope.screenshots);
      $scope.path = response.data.path.split('/')[2] + '/';

    //   console.log($scope.screenshots, $scope.path)
    })
  }

  $scope.openModal = function(selector) {
    // console.log(selector)
    $(selector).openModal();
  }

  // function findTags(screenshots) {
  //   // console.log(screenshots)
  //   for (var i = 0; i < screenshots.length; i++) {
  //     var wordCounts = { };
  //     var words = screenshots[i].text.split(/\b/);
  //
  //     for (var j = 0; j < words.length; j++) {
  //       wordCounts["_" + words[j].toLowerCase()] = (wordCounts["_" + words[j].toLowerCase()] || 0) + 1;
  //     }
  //
  //     console.log(wordCounts);
  //
  //   }
  // }
}
