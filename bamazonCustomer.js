var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your UserName
  user: "root",

  // Your Password
  password: "password",
  database: "bamazon"
});

readProducts();


function bamazonUser() {
	inquirer
		.prompt({
			name: "buyId"
			type: "input"
			message: "Please enter the Item_Id of the item you wish to purchase."
			validate: function(value) {
				if (isNaN(value) === false){
					return true;
				}
				return false;
			}

		})
		.then(function(answer){
			// when finished prompting
			
		})
}

function readProducts() {
  console.log("Displaying all BAMAZON has to offer!\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
  });