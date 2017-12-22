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


function bamazonUser() {
	inquirer
		.prompt(questions)
		.then(function(answer){
			// when finished prompting save answers
			userItem = answer.buyId;
			userQuantity = answer.qty;
			
			connection.query("SELECT * FROM products")

		})
}

function readProducts() {
  console.log("Displaying all BAMAZON has to offer!\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // For Loop to Display All Items for Sale
    for (var i = 0; i < res.length; i++) {
    	console.log(
    		"Item #: " + res[i].item_id +
    		" || Name: " + res[i].product_name +
    		" || Price: " + res[i].price +
    		" || In Stock: " + res[i].stock_quantity
    		);
    	}

    inquirer.prompt(questions).then(function(answer){
    	
    	var chosenItem = res[answer.buyId - 1];
    	if (chosenItem.stock_quantity >= answer.qty){
    		var remInv = chosenItem.stock_quantity - answer.qty;
    		console.log("Fulfilling your order of ..." + chosenItem.product_name);
    		connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: remInv}, {item_id: answer.buyId}], function(err,res){
    			if (err) throw err;
    			console.log("Inventory Updated.");
    		});
    		totalPrice(answer.qty, chosenItem.price);
    	} else {
    		console.log("Insufficient Quantity to fulfill that order.  We only have " + chosenItem.stock_quantity + " of that item available.  Please come again.");
    		connection.end();
    	}
    })

	})

}


function totalPrice(number, price) {
	var total = parseFloat(number) * parseFloat(price);
	console.log("Your total price today is: " + total);
	connection.end();
}