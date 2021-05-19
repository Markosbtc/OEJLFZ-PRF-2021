DROP TABLE IF EXISTS items;
CREATE TABLE items(id serial PRIMARY KEY, name VARCHAR(255), price INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence;
CREATE SEQUENCE hibernate_sequence START 1;

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(id serial PRIMARY KEY, item_id VARCHAR(255), sum INTEGER, date TIMESTAMP);
DROP SEQUENCE IF EXISTS hibernate_sequence2;
CREATE SEQUENCE hibernate_sequence2 START 1;