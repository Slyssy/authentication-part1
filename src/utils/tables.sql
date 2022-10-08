-- # Creating and using the pm_cinch database ------------------------------
CREATE DATABASE pm_cinch;
USE pm_cinch;
-- # Creating organizations table ------------------------------------------
CREATE TABLE organizations(
id int primary key auto_increment,
org_name varchar(100) NOT NULL,
street_address_1 varchar (100),
street_address_2 varchar (100),
city varchar (50),
state_abbr char(2),
zip int,
org_poc_fullName varchar(100),
org_poc_phone varchar(15),
org_email varchar(100) NOT NULL
);

-- # Inserting Data Into organizations table ------------------------------
INSERT INTO organizations(org_name, street_address_1, street_address_2, city, state_abbr, zip, org_poc_fullName, org_poc_phone, org_email)
VALUES
(
'Northstar Fire Protection', '4616-2 Howard Lane', 'Suite 400', 'Austin', 'TX', 78728, 'Jesse Galvan', '+1 210-555-5555', 'jesse.galvan@northstarfire.com'
);

INSERT INTO organizations (org_name, org_email)
VALUES
('ADT Commercial', 'frank_ghiraldi@adt.com');

-- # Creating Users Table ------------------------------------------------
CREATE TABLE users(
id int primary key auto_increment,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL,
position varchar(20) NOT NULL,
email varchar(50) NOT NULL,
phone varchar(15),
pay_rate float,
user_name varchar(20) NOT NULL UNIQUE,
password_hash varchar(1000) NOT NULL,
org_id int,
FOREIGN KEY (org_id) references organizations(id)
)