DROP SCHEMA PUBLIC CASCADE;
CREATE SCHEMA PUBLIC;


-- customer table

CREATE TABLE customers (
    cust_id		SERIAL PRIMARY KEY,
    name 		TEXT,
    email 		TEXT  UNIQUE NOT NULL,
	phone		TEXT,
	passwd		TEXT NOT NULL	
);

CREATE TABLE restaurants (
	rest_id		SERIAL PRIMARY KEY,
	name		TEXT,
	info		TEXT,
	email		TEXT,
	passwd		TEXT,
	phone		TEXT
);

CREATE TABLE dishes (
	dish_id		SERIAL PRIMARY KEY,
	availability	TEXT,
	name		TEXT,
	dish_type		TEXT,
	info		TEXT,
	price		FLOAT,
	image		TEXT,
	rest_id		INT REFERENCES restaurants(rest_id) ON DELETE  CASCADE
);

CREATE TABLE delivery_guys (
	del_id	SERIAL PRIMARY KEY,
	name 	TEXT,
	email	TEXT,
	passwd	TEXT,
	phone 	TEXT
);

CREATE TABLE orders (
	order_id	SERIAL PRIMARY KEY,
	cust_id		INT REFERENCES customers(cust_id) ON DELETE SET NULL,
	rest_id		INT REFERENCES restaurants(rest_id) ON DELETE SET NULL,
	del_id		INT REFERENCES delivery_guys(del_id) ON DELETE SET NULL,
	ord_status		TEXT,
	ord_date	DATE
);

CREATE TABLE order_dishes(
	order_id	INT REFERENCES customers(cust_id) ON DELETE SET NULL,
	dish_id		INT REFERENCES dishes(dish_id)
	quantity 	INT
);

-- CREATE TABLE menu(
-- 	dish_id		INT REFERENCES dishes(dish_id),
-- 	rest_id		INT	REFERENCES restaurants(rest_id)
-- );

CREATE TABLE order_ratings(
	order_id		INT REFERENCES orders(order_id),
	rest_rating		INT,
	del_rating		INT,
	rest_review		TEXT,
	del_review		TEXT
);

CREATE TABLE dish_ratings(
	order_id		INT REFERENCES orders(order_id),
	dish_id		INT REFERENCES dishes(dish_id),
	dish_ratings	INT
);






CREATE TABLE cart(
	cust_id			INT REFERENCES customers(cust_id),
	dish_id			INT REFERENCES dishes(dish_id),
	quantity		INT 
);



-- Customers search frequently for restaurants
CREATE INDEX restaurants_name_idx  ON  restaurants ((lower(name)));

-- Customers search for a certain type of dishes like indian, chinese, spicy etc.,
CREATE INDEX dishes_type_idx ON dishes ((lower(dish_type)));

-- Customers also search frequently for dish names 
CREATE INDEX dishes_name_idx	ON	 dishes ((lower(name)));
