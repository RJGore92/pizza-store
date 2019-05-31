# Epicodus Intermediate JavaScript Object-Oriented Programming: Pizza Store (Independent Project)

#### Independent Project and Unit final for Object-Oriented Programming in the Epicodus Intermediate JavaScript track, 05/09/2019 start date, initial finalization date 05/31/2019

#### By **Robert James "Jimmy" Gore**

## Description

This project serves as the culmination for all lessons learned through Epicodus Units 1-4 and demonstrates all abilities and experiences gained into an application for a pizza store.  The program functions with an initial form split into three sections.  The first is a multiple select box which allows the user to select one or multiple toppings by control-clicking each element of the select list they want.  The second allows for selection of cheese amount, pizza sauce type, and pizza size and contains the form's submit button.  The third contains buttons that will have preselected arrangements for pizza types that will allow for easy and quick selection of one of six types that can then be submitted or customized as the user desires.

Upon submission of the form, the JavaScript will look at the form's values and create and manipulate objects based on those inputs when creating a new pizza order.  It will first adjust the values slightly in the variables of the select lists and replace the variable settings in each property with a revised and capitalized and properly sentenced arrangement, as well as adding new variables and modifying them according to the number of toppings, the amount of cheese, the type of sauce, and the pizza's size to determine the final cost of the entire pizza ordered.  Once the program has taken care of this, it will print a receipt beneath the form with a random background color, a general image of the pizza, the pizza's specs based on the form's input, and the price per slice and total.

## Setup/Installation Requirements

* Install Git Bash for Git repository cloning of the project
* Install Atom for review and edit of Code
* To access repository for project and review code, first clone repository at the appropriate link, then use Git Bash and/or Atom to open the project folder.
* GitHub Pages link is RJGore92.github.io/pizza-store

## Known Bugs

No known bugs are present in this project.

## Assignment Specs

1. The program will accept and create a pizza so long as the pizza has cheese or at least one topping.  This will return false and stop the form submission if there are no toppings and no cheese.  The pizza created will have multiple strings and number values to represent things listed in the description, but for convenience sake, the properties will be relisted here below:
  * Pizza Toppings list (Array of strings (toppings))
  * Pizza Sauce (String)
  * Cheese amount on pizza (string value)
  * Pizza Size (String)
  * Pizza slice count (number based on the size above)
  * Pizza Premade Name (string of premade's name or custom)
  * Confirming premade value (Boolean based on if the pizza is a premade or not)
  * Slice Cost (Double value based first three properties (toppings, sauce, and cheese amount))
  * Total Cost (Based on slice cost and pizza slice count)

2. Should a pizza be deemed valid, based on the inputs, a receipt will be printed according to all the properties listed above below the form.

####  Inputs and outputs (examples):

* Program rejects the pizza if no toppings are selected and the pizza order has a value for no cheese.
  * Inputs: No toppings selected, any pizza sauce, no cheese, any size selected.
  * Output expected: alert from page saying to select some toppings or add cheese, returns false.
* Pizza orders that meet a criteria other than the failing criteria above (be it cheese added, toppings, or both) will be accepted and have receipts printed.
  * Inputs: Toppings (must be present if no cheese is selected, can be present if cheese is added), any sauce, any cheese value (cheese must be present if no toppings are selected, can be included with toppings be it normal or lightly), any size.
  * Output expected: form submits, presents a new div grouping below the form to present a receipt with a random background color as well as details about the order and cost based on topping count, sauce type, cheese amount, and size.

## Technologies Used

* Git Bash
* Atom
* HTML
* MD
* CSS
* Bootstrap
* JavaScript
* jQuery

### License

Copyright (c) 2019 **Robert James "Jimmy" Gore**
