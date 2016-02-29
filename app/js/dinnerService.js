// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  var numberOfGuests = 0;
  var selectedDishes = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  //Returns the selected dish with the value of the given key (with 'Category' as default)
  this.getSelectedDish = function (value, key) {
    if (key === undefined) {
      key = 'Category';
    }

    for (i = 0; i < selectedDishes.length; i++) {
      if (selectedDishes[i][key] === value) {
        return selectedDishes[i];
      }
    }
    return null;
  };

  //Returns all the dishes on the menu.
  this.getFullMenu = function () {
    return selectedDishes;
  };


  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function () {
    //TODO: Concatenate similar ingredients
    var ingredientList = [];
    for (i = 0; i < selectedDishes.length; i++) {
      var ing = selectedDishes[i]['Ingredients'];
      for (j = 0; j < ing.length; j++) {
        ingredientList.push(ing[j]);
      }
    }
    return ingredientList;
  };

  this.getIngredientPrice = function (ing) {
    return ing['Quantity']; //Quantity is ingredient price..
  };
  //Return the cost of a specific dish 
  this.getDishPrice = function (dish) {
    var totalPrice = 0;
    for (i = 0; i < dish['Ingredients'].length; i++) {
      totalPrice += dish['Ingredients'][i]['Quantity']; //Quantity used as currency..
    }
    return totalPrice;
  };

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function () {
    var totalPrice = 0;
    for (var i = 0; i < selectedDishes.length; i++) {
      var dish = selectedDishes[i];
      totalPrice += dish['portions'] * this.getDishPrice(dish);
    }

    return totalPrice;

  };

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function (dish) {
    dish['portions'] = numberOfGuests;
    var currentDish = this.getSelectedDish(dish['Category']);

    if (currentDish !== null) {
      this.removeDishFromMenu(currentDish['RecipeID']);
    }

    selectedDishes.push(dish);
  };

  //Removes dish from menu
  this.removeDishFromMenu = function (id) {
    var removed;
    for (i = 0; i < selectedDishes.length; i++) {
      if (selectedDishes[i]['RecipeID'] === id) {
        removed = selectedDishes.splice(i, 1);
        break;
      }
    }
  };
  var given_api_key = '18f3cT02U9f6yRl3OKDpP8NA537kxYKu';
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:given_api_key});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:given_api_key}); 


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});