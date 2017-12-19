-- Drops the bamazon if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  -- unique id for each product, will ensure each new product gets a number automatically assigned to it, can't be null --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(50) NOT NULL,
  -- Makes a string column called "department_name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes a numeric column called "price" This presents costs to the consumer--
  price DECIMAL(10, 2) NOT NULL,
  -- Makes a numeric column called "stock_quantity" This monitors inventory--
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spam", "Grocery", 2.95, 50);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Magical Pork Butt Rub", "Grocery", 5.95, 10);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("5QT. Silver Mixing Bowl", "Housewares", 9.95, 25);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sher-it's Shampoo", "Health & Beauty", 3.95, 15);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tactical Flashlight", "Housewares", 25.95, 30);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rubber Chicken", "Toys & Games", 1.50, 50);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Handcuffs", "Toys & Games", 9.95, 2);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Strawberries", "Grocery", 6.25, 13);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legend of Boris: Kremlin Krackdown", "Toys & Games", 59.95, 50);
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sheer Nylon Tights", "Clothing", 35.99, 50);
