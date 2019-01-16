CREATE DATABASE users;
USE users;
CREATE TABLE users
(
    id int NOT NULL
    AUTO_INCREMENT,
	first_name varchar (200) NOT NULL,
	last_name varchar (200) NOT NULL,
    age INTEGER(10),
	PRIMARY KEY(id)
);


INSERT INTO users (first_name, last_name, age)
VALUES ("Ahmed", "Akhtar", 28);

INSERT INTO users (first_name, last_name, age)
VALUES ("Javier", "Radillo", 25)
