// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.dish;
  $scope.ingredients;
  $scope.dishPrice;
  $scope.search = function(id) {
   $scope.status = "Searching...";
   Dinner.Dish.get({id},function(data){
      $scope.dish = data;
      $scope.ingredients = $scope.dish.Ingredients;
      $scope.dishPrice = Dinner.getDishPrice($scope.dish);
     $scope.status = "Showing " + data.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
  }
  $scope.search($routeParams.dishId);

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  };



  $scope.ingQuantity = function(ing) {
  	var ret = Dinner.getNumberOfGuests() * ing.Quantity.toFixed(2) + " " + ing['Unit'];
  	return ret;
  };

  $scope.ingPrice = function(ing) {
  	var ret = Dinner.getNumberOfGuests() * Dinner.getIngredientPrice(ing).toFixed(2);
  	return ret;
  };

  $scope.addToMenu = function(dish) {
  	Dinner.addDishToMenu(dish);
  };

  $scope.totalIngredientPrice = function() {
    return ($scope.dishPrice * Dinner.getNumberOfGuests()).toFixed(2);
  };

  
});