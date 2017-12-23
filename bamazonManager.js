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
	bamazonManager();
})

var managerInterface = 
	[
		{
			name: "mOps",
			type: "list",
			message: "Welcome BAMAZON manager!\n  What do you want to do?",
			choices: ["View Products", "View Low Inventory Products", "Add Inventory to an existing products", "Add New Inventory Item", "Exit"]
		}
	];


function bamazonManager() {
	inquirer
		.prompt(managerInterface)
		.then(function(answer){

			var userChoice = answer.mOps;
			switch(userChoice) {
				case "View Products":
					// Call View Products
					readProducts();
					break;
				case "View Low Inventory Products":
					// Call View Low Inventory
					lowInventory();
					break;
				case "Add Inventory to an existing products":
					// Call Add Inventory
					addInventory();
					break;
				case "Add New Inventory Item":
					// Call New Inventory
					addNewProduct();
					break;
				case "Exit":
					// Call for Exit
					exitBamazon();
			};
			
		});
}


// Option 1 - "View Products for Sale"

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
    // End Connection
    // connection.end();
    // Call bamazonManager for Next Action
    bamazonManager();
    });
}

// Option 2 - "View Low Inventory"
function lowInventory() {
  console.log("The Following items have less than five left in stock!\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // For Loop to Display All Items for Sale
    for (var i = 0; i < res.length; i++) {
    	if (res[i].stock_quantity <= 5) {
	    	console.log(
	    		"Item #: " + res[i].item_id +
	    		" || Name: " + res[i].product_name +
	    		" || Price: " + res[i].price +
	    		" || In Stock: " + res[i].stock_quantity
	    		);
	    }
    };
    console.log("-------- End of Low Inventory Listing --------");
    console.log("----------------------------------------------");
    // End Connection
    // connection.end();
    // Call bamazonManager for Next Action
    bamazonManager();
    });
}


// Option 3 - "Add to Inventory"
function addInventory() {
  console.log("Which item would you like to add inventory to?\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    var menu = [];
    // For Loop to Display All Items for Sale
    for (var i = 0; i < res.length; i++) {
    	if (res[i].stock_quantity <= 5) {
	    	console.log(
	    		"Item #: " + res[i].item_id +
	    		" || Name: " + res[i].product_name +
	    		" || Price: " + res[i].price +
	    		" || In Stock: " + res[i].stock_quantity
	    		);
	    }
    };
    console.log("-------- End of Low Inventory Listing --------");
    console.log("----------------------------------------------");
    // End Connection
    // connection.end();
    // Call bamazonManager for Next Action
    bamazonManager();
    });
}

// Option 4 - "Add New Product"
function addNewProduct() {

}

function exitBamazon() {
	connection.end();
}