# Node.js & MySQL Homework: Bamazon
## UNC Coding Bootcamp
## Charles Bowden

### OverView

This activity required the creation of a MySql database and a few command line applications that would be required to manage inventory for a store from both the user perspective and from a manager's perspective.  

### MySql

Included in this repo is the MySql script used to generate my demo repository.

### Node.js and JS files

- Requires NPM packages 'mysql' and 'inquirer'
  - MySql https://www.npmjs.com/package/mysql
  - Inquirer https://www.npmjs.com/package/inquirer

- bamazonCustomer.js 
  - Contains the javascript coding for the store interface.
  - Sample screenshot of program is included in the Github repository named "bamazonCustomer.png" https://github.com/ctbowden/bamazon/blob/master/bamazonCustomer.png.
  - The application will display a list of items to a user, prompt the user for the number of their item selection, and prompt for quantity to buy.  Then, sufficient inventory is available the application will deduct the order from the database and return a total price for the requested items.  If not enough items were available, the order will decline.

- bamazonManager.js
  - Contains the javascript coding for the manager view of the store.  
  - Sample Screenshot of program is included in this Github repository named "bamazonManager.png".
  - The application will provide users with a menu of five items that manage the bamazon database:
     - View Products - lists the products in Bamazon Database
     - Low Inventory Products - Shows a list of items with inventory 5 or less
     - Add to Inventory - Allows user to select an item and change it's inventory quantity
     - Add New Inventory Item - Add an entirely new item to the database
     - Exit - Exit the system

### Demo Video

Youtube https://youtu.be/vf0opriWD8A
