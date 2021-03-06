// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner, $location) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  };

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  };

  $scope.menuDishes = Dinner.getFullMenu();


  $scope.getDishPortions = function(dish) {
    return dish.portions;
  };
  $scope.getPrice = function(dish) {
  	return (Dinner.getDishPrice(dish) * dish.portions).toFixed(2);
  };

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.getTotalMenuPrice = function() {
    return Dinner.getTotalMenuPrice();
  };

  $scope.removeDish = function(dishID) {
    Dinner.removeDishFromMenu(dishID);
  }

  $scope.go = function (path , id) {
    $location.path( path );//.search({dishId: id});
  };

});