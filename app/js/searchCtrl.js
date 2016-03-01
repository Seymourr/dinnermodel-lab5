// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  $scope.dishes;
  $scope.search = function(query) {
   $scope.status = "searching";
   Dinner.DishSearch.get({title_kw:query},function(data){
     $scope.dishes=data.Results;
     $scope.status = "showing";
     if(data.Results.length == 0) {
      $scope.status = "nothing"
     }
   },function(data){
     $scope.status = "failure";
   });
  }

  var timer = 0;
  $scope.inputSearch = function(query) {
    if(timer != 0) {
      clearTimeout(timer);
    }

    timer = setTimeout($scope.search(query), 500);
  }

});