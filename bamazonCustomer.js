var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your UserName
  user: "root",

  // Your Password
  password: "",
  database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	readProducts();
})

var questions = [{
			name: "buyId",
			type: "input",
			message: "Please enter the Item_Id of the item you wish to purchase.",
			validate: function(value) {
				if (isNaN(value) === false){
					return true;
				}
				return false;
			}
		},
		{
			name: "qty",
			type: "input",
			message: "Please enter the Quantity you would like to purchase.",
			validate: function(value) {
				if (isNaN(value) === false){
					return true;
				}
				return false;
			}
		}];


function readProducts() {
  console.log("Displaying all BAMAZON has to offer!\n");
  // Connect and query database
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Loop through database response to display items for sale
    for (var i = 0; i < res.length; i++) {
    	console.log(
    		"Item #: " + res[i].item_id +
    		" || Name: " + res[i].product_name +
    		" || Price: " + res[i].price +
    		" || In Stock: " + res[i].stock_quantity
    		);
    	}

    // Prompt User for item number they would like to purchase
    inquirer.prompt(questions).then(function(answer){
		
		// Create a variable to store the database response from earlier with an index of the user's item input -1    	
    	var chosenItem = res[answer.buyId - 1];
    	// Check to see if the chosenItem.stockquantity is > or equal to requested number if so, fulfill order if not decline order
    	if (chosenItem.stock_quantity >= answer.qty){
    		// create a variable to hold the number of items left after order is placed
    		var remInv = chosenItem.stock_quantity - answer.qty;
    		// Notify user their request is being fulfilled and remind of item
    		console.log("Fulfilling your order of ..." + chosenItem.product_name);
    		// Connect to DB and update the database with the new number of products after this sale
    		connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: remInv}, {item_id: answer.buyId}], function(err,res){
    			if (err) throw err;
    			// Log Success
    			console.log("Inventory Updated.");
    		});
    		// Call totalPrice to user the price of their order
    		totalPrice(answer.qty, chosenItem.price);
    	} else {
    		// Inform User there is not enough of requested item to fill their order, also letting them know how much is available.
    		console.log("Insufficient Quantity to fulfill that order.  We only have " + chosenItem.stock_quantity + " of that item available.  Please come again.");
    		// Close Connection
    		connection.end();
    	}
    })

	})

}

// Requires quantity of items and price and returns the total for the sale
function totalPrice(number, price) {
	// perform math to provide total to user
	var total = parseFloat(number) * parseFloat(price);
	// Log price to user
	console.log("Your total price today is: " + total);
	// Close Connection
	connection.end();
}