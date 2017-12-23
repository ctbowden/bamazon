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
	
		// prompt for item id to add inventory to   
	    inquirer.prompt([
	    	{
	    		name: "whichItem",
	    		type: "input",
	    		message: "Enter the Item Id for the item you wish to update",
				validate: function(value) {
					if (isNaN(value) === false){
						return true;
					}
					return false;
				}
			},
			{
				name: "number",
				type: "input",
				message: "Enter the amount of total inventory for this item",
				validate: function(value) {
					if (isNaN(value) === false){
						return true;
					}
					return false;
				}
			}
		    ]).then(function(answer){
		    	var currentStock = answer.number;
		    	var ofItem = answer.whichItem;
		    	var query = connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: currentStock
						}, 
						{
							item_id: ofItem
						}
					], 
					function(err, res) {
		    			console.log(res.affectedRows + " products updated!\n");
		    			// Back to main menu
		    			bamazonManager();
		    	});
		    });
	});
}


// Option 4 - "Add New Product"
function addNewProduct() {
	console.log("New Item entry, only use for items not previously sold!\n");
  	
	inquirer.prompt([
	   	{
	   		name: "product",
	   		type: "input",
	   		message: "Enter the product_name for the item you wish to add: "
		},
		{
			name: "department",
			type: "input",
			message: "Enter the department_name for the item you wish to add: "
		},
		{
			name: "price",
			type: "input",
			message: "Enter the price for the item you wish to add: ",
			validate: function(value) {
				if (isNaN(value) === false){
					return true;
				}
					return false;
				}
		},
		{
			name: "stock",
			type: "input",
			message: "Enter the amount of total inventory for this item",
			validate: function(value) {
				if (isNaN(value) === false){
					return true;
				}
					return false;
				}
		}
		]).then(function(answer){
		   	var sql = "INSERT INTO products SET ?";
		   	var query = connection.query(sql,
		   		{
		   			product_name: answer.product,
		   			department_name: answer.department,
		   			price: answer.price,
		   			stock_quantity: answer.stock
		   		}, function(err, res) {
		   		if (err) throw err;
		   		console.log("New Product Added!\n" +res.affectedRows);
		    	// Back to main menu
	    		bamazonManager();
	    		});
	    });

}

function exitBamazon() {
	connection.end();
}