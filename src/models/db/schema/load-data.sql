\c bookstore_development

\copy book(title, author, genre) FROM './src/models/db/schema/books-data.csv' WITH DELIMITER ',' CSV HEADER
