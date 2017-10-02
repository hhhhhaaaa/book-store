CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  genre TEXT
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  account_id INT REFERENCES account(ID),
  role VARCHAR(50) NOT NULL
);
