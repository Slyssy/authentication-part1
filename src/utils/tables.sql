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

-- # Creating Projects Table -----------------------------------------------
CREATE TABLE projects(
id int primary key auto_increment,
user_id int NOT NULL,
project_name varchar(50) NOT NULL,
street_1 varchar(50) NOT NULL,
street_2 varchar(50) NOT NULL,
city varchar(20) NOT NULL,
state char(2) NOT NULL,
zip char(5),
project_status varchar(10) NOT NULL,
project_margin decimal(5, 2),
original_revenue decimal(11, 2),
adjusted_revenue decimal(11, 2),
budgeted_material_expense decimal(11, 2),
budgeted_labor_expense decimal(11, 2),
budgeted_subcontractor_expense decimal(11, 2),
budgeted_miscellaneous_expense decimal(11, 2),
adjusted_material_expense decimal(11, 2),
adjusted_labor_expense decimal(11, 2),
adjusted_subcontractor_expense decimal(11, 2),
adjusted_miscellaneous_expense decimal(11, 2),
actual_material_expense decimal(11, 2),
actual_labor_expense decimal(11, 2),
actual_subcontractor_expense decimal(11, 2),
actual_miscellaneous_expense decimal(11, 2),
estimated_start_date date,
estimated_complete_date date,
actual_start_date date,
actual_complete_date date,
FOREIGN KEY (user_id) references users(id)

-- # Creating Expense Table ----------------------------------------------------
CREATE TABLE expenses (
id int primary key auto_increment,
project_id int NOT NULL,
expense_date date NOT NULL,
expense_type varchar(20) NOT NULL,
vendor_name varchar(20)  NOT NULL,
expense_amount decimal(11, 2),
FOREIGN KEY (project_id) references projects(id)
)

-- #Creating Comments Table ----------------------------------------------------
CREATE TABLE comments (
id int primary key auto_increment,
project_id int NOT NULL,
comment_subject varchar(50) NOT NULL,
comment_description varchar(500) NOT NULL,
comment_date date NOT NULL,
FOREIGN KEY (project_id) references projects(id)
)
