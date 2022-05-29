CREATE DATABASE bookstore_database;


CREATE TABLE book(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(50) NOT NULL,
    price NUMERIC(19,2) NOT NULL
);

CREATE TABLE customer(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(16) NOT NULL,
    account NUMERIC(19,2) NOT NULL,
    book_id INT REFERENCES book (id),
    UNIQUE(book_id)
);

CREATE TABLE cart(
id SERIAL NOT NULL PRIMARY KEY,
date_of_order DATE NOT NULL,
country_of_shipment VARCHAR(50) NOT NULL,
customer_id INT REFERENCES customer (id),
    UNIQUE(customer_id)
);
 insert into customer(name,email,password,account,book_id) values('Soha Khalid','soha@email','soha',5000.45,1);
 insert into customer (name,email,password,account,book_id) values('Amina Omar', 'amina@email','amina',7000.55,2);

 insert into book (title,author,price) values('Fardaqan', 'Youssof Zedan', 100.59);
 insert into book (title,author,price) values('Aragul Arabea','Gamal Moawad', 70.88);

// SELECT * FROM customer;
// DROP table customer;
// DROP database bookstore_database;
// psql -U postgres
// \c bookstore_database;