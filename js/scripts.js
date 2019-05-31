function PizzaList() {
  this.pizzasOrdered = [],
  this.pizzaOrderNumber = 0;
}

PizzaList.prototype.orderPizza = function (pizza) {
  pizza.pizzaNumber = this.assignOrderNumber();
  this.pizzasOrdered.push(pizza);
};

PizzaList.prototype.assignOrderNumber = function () {
  this.pizzaOrderNumber += 1;
  return this.pizzaOrderNumber;
};

PizzaList.prototype.readOrderInfo = function (orderId) {
  for (var i = 0; i < this.pizzasOrdered.length; i++) {
    if (this.pizzasOrdered[i]) {
      if (this.pizzasOrdered[i].pizzaNumber == orderId) {
        return this.pizzasOrdered[i];
      }
    }
  }
  return false;
};

PizzaList.prototype.deleteOrderInfo = function (orderId) {
  for (var i = 0; i < this.pizzasOrdered.length; i++) {
    if (this.pizzasOrdered[i]) {
      if (this.pizzasOrdered[i].pizzaNumber == orderId) {
        delete this.pizzasOrdered[i];
        return true;
      }
    }
  }
  return false;
};


var currentPizzaOrderList = new PizzaList();
var premadePizzaList = new PizzaList();

function Pizza(toppings, sauceType, cheeseAmount, pizzaSize, pizzaType, isPremade) {
  this.toppings = toppings,
  this.sauceType= sauceType,
  this.cheeseAmount = cheeseAmount,
  this.pizzaSize = pizzaSize;
  this.pizzaType = pizzaType,
  this.isPremade = isPremade;
}

Pizza.prototype.adjustToppings = function () {
  var toppingsSelected = this.toppings;
  var toppingsRevised = [];
  toppingsSelected.forEach(function(topping) {
    var toppingCapped = "";
    var multiWordSplit = topping.includes("-");
    var wordsArray = [];
    if (multiWordSplit) {
      var toppingSplit = topping.split("-");
      toppingSplit.forEach(function(word) {
        var wordToCap =  word.split("")
        wordToCap[0] = wordToCap[0].toUpperCase();
        // console.log(wordToCap);
        var cappedWord = wordToCap.join("");
        // console.log(cappedWord);
        wordsArray.push(cappedWord);
      });
      toppingCapped = wordsArray.join(" ");
      toppingsRevised.push(toppingCapped);
      toppingCapped = "";
      wordsArray = [];
    }
    else {
      var wordToCap = topping.split("");
      wordToCap[0] = wordToCap[0].toUpperCase();
      // console.log(wordToCap);
      toppingCapped = wordToCap.join("");
      // console.log(toppingCapped);
      toppingsRevised.push(toppingCapped);
      toppingCapped = "";
    }
  });
  this.toppings = toppingsRevised;
};

Pizza.prototype.adjustSauce = function () {
  var sauceVal = this.sauceType;
  if (sauceVal === "standard") {
    this.sauceType = "Standard Pizza Sauce";
  }
  else if (sauceVal === "bbq") {
    this.sauceType = "BBQ Sauce";
  }
  else if (sauceVal === "ranch") {
    this.sauceType = "Ranch Drizzle";
  }
  else {
    this.sauceType = "Other";
  }
  // console.log(this.sauceType);
};

Pizza.prototype.adjustCheese = function () {
  var cheeseVal = this.cheeseAmount;
  if (cheeseVal === "add-cheese") {
    this.cheeseAmount = "Normal Cheese";
  }
  else if (cheeseVal === "light-cheese") {
    this.cheeseAmount = "Light Cheese";
  }
  else if (cheeseVal === "no-cheese") {
    this.cheeseAmount = "No Cheese";
  }
  else {
    this.cheeseAmount = "Other";
  }
};

Pizza.prototype.determinePremade = function (premadesList) {
  var premadeListToRead = premadesList;
  var pizzaPremade = "Custom";
  var premadeConfirmCheck = false;
  // console.log(this);
  premadePizzaComparator:
  for (var i = 0; i < premadesList.pizzasOrdered.length; i++) {
    if (this.toppings.length === premadesList.pizzasOrdered[i].toppings.length) {
      toppingsComparator:
      for (var j = 0; j < premadesList.pizzasOrdered[i].toppings.length; j++) {
        // console.log(premadesList.pizzasOrdered[i].toppings[j]);
        // console.log(this.toppings[j]);
        if (premadesList.pizzasOrdered[i].toppings[j] !== this.toppings[j]) {
          console.log(premadesList.pizzasOrdered[i].toppings[j] !== this.toppings[j]);
          continue premadePizzaComparator;
        }
        else if (j === (premadesList.pizzasOrdered[i].toppings.length - 1)) {
          if ((this.sauceType === premadesList.pizzasOrdered[i].sauceType) && (this.cheeseAmount === premadesList.pizzasOrdered[i].cheeseAmount)) {
            pizzaPremade = premadesList.pizzasOrdered[i].pizzaType;
            premadeConfirmCheck = true;

            break premadePizzaComparator;
          }
          else {
            continue premadePizzaComparator;
          }
        }
      }
    }
  }
  this.pizzaType = pizzaPremade;
  this.isPremade = premadeConfirmCheck;
  return premadeConfirmCheck;
};

Pizza.prototype.adjustSize = function () {
  var sizeVal = this.pizzaSize;
  if(sizeVal === "small") {
    this.pizzaSize = "Small Pizza (6 slices)"
    this.sliceCount = 6;
    return true;
  }
  else if(sizeVal === "medium") {
    this.pizzaSize = "Medium Pizza (8 slices)"
    this.sliceCount = 8;
    return true;
  }
  else {
    this.pizzaSize = "Large Pizza (10 slices)"
    this.sliceCount = 10;
    return true;
  }
};

Pizza.prototype.determinePrice = function () {
  var estimatedSliceCost = 0.00;
  var toppingCost = 0.20;
  var cheeseCost = 0.40;
  var bbqSauceCost = 0.60;
  var ranchCost = 0.50;
  var standardSauceCost = 0.25;
  this.toppings.forEach(function(topping){
    estimatedSliceCost += toppingCost;
  });
  if (this.cheeseAmount === "Normal Cheese") {
    estimatedSliceCost += (cheeseCost * 1.5);
  }
  if (this.cheeseAmount === "Light Cheese") {
    estimatedSliceCost += cheeseCost;
  }
  if (this.sauceType === "Standard Pizza Sauce") {
    this.estimatedSliceCost += standardSauceCost;
  }
  if (this.sauceType === "BBQ Sauce") {
    this.estimatedSliceCost += bbqSauceCost;
  }
  if (this.sauceType === "Ranch Drizzle") {
    this.estimatedSliceCost += ranchCost;
  }
  console.log(estimatedSliceCost);
  this.sliceCost = parseFloat(estimatedSliceCost.toFixed(2));
  console.log(this.sliceCost);
  this.pizzaTotalCost = parseFloat((this.sliceCost * this.sliceCount).toFixed(2));
};

Pizza.prototype.printReceipt = function () {
  var bgRVal = Math.floor(Math.random() * 256);
  var bgGVal = Math.floor(Math.random() * 256);
  var bgBVal = Math.floor(Math.random() * 256);
  var printedRows = (Math.floor(parseFloat((currentPizzaOrderList.pizzaOrderNumber) / 2)));
  var targetPizza = currentPizzaOrderList.pizzaOrderNumber;
  console.log(targetPizza);
  console.log(printedRows);
  if ((currentPizzaOrderList.pizzaOrderNumber === 0) || ((currentPizzaOrderList.pizzaOrderNumber) % 2 === 0)) {
    $("div#order-form-outputs").append(
      "<div class='row' id='output-row" + printedRows + "'></div>"
    );
  }
  $("div#output-row"+printedRows).append(
    "<div class='col-6' id='receipt"+ targetPizza + "'>" +
      "<div class=jumbotron style='background-color:rgb(" + bgRVal + ", " + bgGVal + ", " + bgBVal + ");'>" +
        "<div class='row'>" +
          "<div class='col-6' id='pizza-receipt-img" + targetPizza + "'>" +
          "</div>" +
          "<div class='col-6'>" +
            "<ul id='pizza-toppings" + targetPizza + "'></ul>" +
          "</div>" +
        "</div>" +
        "<div class='row'>"+
          "<div class='col-8'>"+
            "<p>Pizza Sauce: <span id='pizza-sauce-print" + targetPizza +"'></span></p>" +
            "<p>Pizza Cheese Amount: <span id='pizza-cheese-print" + targetPizza + "'></span></p>" +
            "<p>Pizza Size (slice count): <span id='pizza-slice-count" + targetPizza + "'></span></p>" +
          "</div>" +
          "<div class='col-4'>" +
            "<p>Slice Cost: $<span id='pizza-slice-cost-print" + targetPizza + "'></span></p>" +
            "<p>Total Cost: $<span id='pizza-cost-print" + targetPizza + "'></span></p>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
  for (var i = 0; i < this.toppings.length; i++) {
    $("ul#pizza-toppings"+targetPizza).append("<li>"+this.toppings[i]+"</li>");
  }
  $("span#pizza-sauce-print" + targetPizza).text(this.sauceType);
  $("span#pizza-cheese-print" + targetPizza).text(this.cheeseAmount);
  $("span#pizza-slice-count" + targetPizza).text(this.sliceCount);
  $("span#pizza-slice-cost-print" + targetPizza).text(parseFloat(this.sliceCost).toFixed(2));
  $("span#pizza-cost-print" + targetPizza).text(parseFloat(this.pizzaTotalCost).toFixed(2));
  if (this.pizzaType === "Custom") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://www.brosgiantpizza.com/wp-content/uploads/2016/08/custom-pizza.png' alt='Custom-Pizza.png' width='200' height='200'>");
  }
  if (this.pizzaType === "Meat Lover's") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://www.bakedbyrachel.com/wp-content/uploads/2014/08/meatloverspizza1_bakedbyrachel.jpg' alt='Meat-Lovers-Pizza.png' width='200'>");
  }
  if (this.pizzaType === "Veggie Lover's") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://www.tasteofhome.com/wp-content/uploads/2018/02/Grilled-Veggie-Pizza_EXPS_LSBZ18_48960_D01_18_6b-696x696.jpg' alt='Veggie-Pizza.jpg' width='200'>");
  }
  if (this.pizzaType === "Canadian Bacon and Pineapple") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://cdn.sallysbakingaddiction.com/wp-content/uploads/2014/08/It-doesnt-get-much-better-than-Homemade-Hawaiian-Pizza.-Tropical-paradise-for-dinner-2.jpg' alt='Hawaiian-Pizza.jpg' width='200'>");
  }
  if (this.pizzaType === "Pepperoni and Sausage") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://www.asweetpeachef.com/wp-content/uploads/2010/09/italian-sausage-pepperoni-pizza.png' alt='Pepperoni-Sausage-Pizza.png' width='200'>");
  }
  if (this.pizzaType === "Chicken Bacon Ranch") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://cloudfront.bjsrestaurants.com/img_57aa5818ab29a6.31949586_Chk.BaconRanchDDP-01.jpg' alt='Chicken-Bacon-Ranch-Pizza.jpg' width='200'>");
  }
  if (this.pizzaType === "BBQ Chicken") {
    $("div#pizza-receipt-img" + targetPizza).append("<img src='https://cloudfront.bjsrestaurants.com/img_58ac9905a24c49.53752693_BBQDeepDishPizza_13-800.jpg' alt='BBQ-Chicken-Pizza.jpg' width='200'>");
  }
};

function premadeOneSelector() {
  $("select#topping-selection option[value='pepperoni']").prop('selected', true);
  $("select#topping-selection option[value='sausage']").prop('selected', true);
  $("select#topping-selection option[value='chicken']").prop('selected', true);
  $("select#topping-selection option[value='canadian-bacon']").prop('selected', true);
  $("select#topping-selection option[value='bacon']").prop('selected', true);
  $("select#topping-selection option[value='pineapple']").prop('selected', false);
  $("select#topping-selection option[value='red-pepper']").prop('selected', false);
  $("select#topping-selection option[value='green-pepper']").prop('selected', false);
  $("select#topping-selection option[value='olives']").prop('selected', false);
  $("select#topping-selection option[value='onions']").prop('selected', false);
  $("select#topping-selection option[value='mushrooms']").prop('selected', false);
  $("select#topping-selection option[value='tomatoes']").prop('selected', false);
  $("select#sauce-selection").val("standard");
  $("select#cheese-confirm").val("add-cheese");
}

function premadeTwoSelector() {
  $("select#topping-selection option[value='pepperoni']").prop('selected', false);
  $("select#topping-selection option[value='sausage']").prop('selected', false);
  $("select#topping-selection option[value='chicken']").prop('selected', false);
  $("select#topping-selection option[value='canadian-bacon']").prop('selected', false);
  $("select#topping-selection option[value='bacon']").prop('selected', false);
  $("select#topping-selection option[value='pineapple']").prop('selected', false);
  $("select#topping-selection option[value='red-pepper']").prop('selected', true);
  $("select#topping-selection option[value='green-pepper']").prop('selected', true);
  $("select#topping-selection option[value='olives']").prop('selected', true);
  $("select#topping-selection option[value='onions']").prop('selected', true);
  $("select#topping-selection option[value='mushrooms']").prop('selected', true);
  $("select#topping-selection option[value='tomatoes']").prop('selected', true);
  $("select#sauce-selection").val("standard");
  $("select#cheese-confirm").val("light-cheese");
}

function premadeThreeSelector() {
  $("select#topping-selection option[value='pepperoni']").prop('selected', false);
  $("select#topping-selection option[value='sausage']").prop('selected', false);
  $("select#topping-selection option[value='chicken']").prop('selected', false);
  $("select#topping-selection option[value='canadian-bacon']").prop('selected', true);
  $("select#topping-selection option[value='bacon']").prop('selected', true);
  $("select#topping-selection option[value='pineapple']").prop('selected', true);
  $("select#topping-selection option[value='red-pepper']").prop('selected', false);
  $("select#topping-selection option[value='green-pepper']").prop('selected', false);
  $("select#topping-selection option[value='olives']").prop('selected', false);
  $("select#topping-selection option[value='onions']").prop('selected', false);
  $("select#topping-selection option[value='mushrooms']").prop('selected', false);
  $("select#topping-selection option[value='tomatoes']").prop('selected', false);
  $("select#sauce-selection").val("standard");
  $("select#cheese-confirm").val("add-cheese");
}

function premadeFourSelector() {
  $("select#topping-selection option[value='pepperoni']").prop('selected', true);
  $("select#topping-selection option[value='sausage']").prop('selected', true);
  $("select#topping-selection option[value='chicken']").prop('selected', false);
  $("select#topping-selection option[value='canadian-bacon']").prop('selected', false);
  $("select#topping-selection option[value='bacon']").prop('selected', false);
  $("select#topping-selection option[value='pineapple']").prop('selected', false);
  $("select#topping-selection option[value='red-pepper']").prop('selected', false);
  $("select#topping-selection option[value='green-pepper']").prop('selected', false);
  $("select#topping-selection option[value='olives']").prop('selected', false);
  $("select#topping-selection option[value='onions']").prop('selected', false);
  $("select#topping-selection option[value='mushrooms']").prop('selected', false);
  $("select#topping-selection option[value='tomatoes']").prop('selected', false);
  $("select#sauce-selection").val("standard");
  $("select#cheese-confirm").val("add-cheese");
}

function premadeFiveSelector() {
  $("select#topping-selection option[value='pepperoni']").prop('selected', false);
  $("select#topping-selection option[value='sausage']").prop('selected', false);
  $("select#topping-selection option[value='chicken']").prop('selected', true);
  $("select#topping-selection option[value='canadian-bacon']").prop('selected', false);
  $("select#topping-selection option[value='bacon']").prop('selected', true);
  $("select#topping-selection option[value='pineapple']").prop('selected', false);
  $("select#topping-selection option[value='red-pepper']").prop('selected', false);
  $("select#topping-selection option[value='green-pepper']").prop('selected', false);
  $("select#topping-selection option[value='olives']").prop('selected', false);
  $("select#topping-selection option[value='onions']").prop('selected', true);
  $("select#topping-selection option[value='mushrooms']").prop('selected', false);
  $("select#topping-selection option[value='tomatoes']").prop('selected', true);
  $("select#sauce-selection").val("ranch");
  $("select#cheese-confirm").val("light-cheese");
}

function premadeSixSelector() {
  $("select#topping-selection option[value='pepperoni']").prop('selected', false);
  $("select#topping-selection option[value='sausage']").prop('selected', false);
  $("select#topping-selection option[value='chicken']").prop('selected', true);
  $("select#topping-selection option[value='canadian-bacon']").prop('selected', false);
  $("select#topping-selection option[value='bacon']").prop('selected', false);
  $("select#topping-selection option[value='pineapple']").prop('selected', false);
  $("select#topping-selection option[value='red-pepper']").prop('selected', false);
  $("select#topping-selection option[value='green-pepper']").prop('selected', false);
  $("select#topping-selection option[value='olives']").prop('selected', false);
  $("select#topping-selection option[value='onions']").prop('selected', true);
  $("select#topping-selection option[value='mushrooms']").prop('selected', false);
  $("select#topping-selection option[value='tomatoes']").prop('selected', true);
  $("select#sauce-selection").val("bbq");
  $("select#cheese-confirm").val("add-cheese");
}

$(document).ready(function() {
  var pizzaPremadeOne = new Pizza(["Pepperoni", "Sausage", "Chicken", "Canadian Bacon", "Bacon"], "Standard Pizza Sauce", "Normal Cheese", "Meat Lover's", true);
  var pizzaPremadeTwo = new Pizza(["Red Pepper", "Green Pepper", "Olives", "Onions", "Mushrooms", "Tomatoes"], "Standard Pizza Sauce", "Light Cheese", "Veggie Lover's", true);
  var pizzaPremadeThree = new Pizza(["Canadian Bacon", "Bacon", "Pineapple"], "Standard Pizza Sauce", "Normal Cheese", "Canadian Bacon and Pineapple", true);
  var pizzaPremadeFour = new Pizza(["Pepperoni", "Sausage"], "Standard Pizza Sauce", "Normal Cheese", "Pepperoni and Sausage", true);
  var pizzaPremadeFive = new Pizza(["Chicken", "Bacon", "Onions", "Tomatoes"], "Ranch Drizzle", "Light Cheese", "Chicken Bacon Ranch", true);
  var pizzaPremadeSix = new Pizza(["Chicken", "Onions", "Tomatoes"], "BBQ Sauce", "Normal Cheese", "BBQ Chicken", true);
  premadePizzaList.orderPizza(pizzaPremadeOne);
  premadePizzaList.orderPizza(pizzaPremadeTwo);
  premadePizzaList.orderPizza(pizzaPremadeThree);
  premadePizzaList.orderPizza(pizzaPremadeFour);
  premadePizzaList.orderPizza(pizzaPremadeFive);
  premadePizzaList.orderPizza(pizzaPremadeSix);
  $("form#pizza-creation-form").submit(function(event) {
    event.preventDefault();
    var toppingsSelected = $("select#topping-selection").val();
    // console.log(toppingsSelected);
    var sauceType = $("select#sauce-selection").val();
    // console.log(sauceType);
    var cheeseAmount = $("select#cheese-confirm").val();
    if (toppingsSelected.length === 0 && cheeseAmount === "no-cheese") {
      alert("Please select at least one topping or add cheese for your pizza.");
      return false;
    }
    // console.log(cheeseAmount);
    var sizeToMake = $("select#pizza-size").val();
    var defaultType = "Custom";
    var defaultPremadeConfirm = false;
    var pendingPizza = new Pizza(toppingsSelected, sauceType, cheeseAmount, sizeToMake, defaultType, defaultPremadeConfirm);
    pendingPizza.adjustToppings();
    pendingPizza.adjustSauce();
    pendingPizza.adjustCheese();
    pendingPizza.determinePremade(premadePizzaList);
    pendingPizza.adjustSize();
    pendingPizza.determinePrice();
    console.log(pendingPizza);
    pendingPizza.printReceipt();
    currentPizzaOrderList.orderPizza(pendingPizza);
  });
});
