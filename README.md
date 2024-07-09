
## Bookstore RESTful API

This repository contains a TypeScript-based RESTful API for managing a bookstore. It allows users to perform CRUD operations on authors and books, leveraging Express for the web framework and PostgreSQL as the database.

## Features

- Create, Read, Update, Delete operations for authors and books
- Data validation using Joi
- Error handling middleware
- TypeScript for type safety
- Knex.js for database queries
- Basic structure for scalability and maintainability


## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js installed on your local machine
- mysql installed and running
- A mysql database created for this project
- Knowledge of TypeScript and Express framework
## Run Locally

Clone the project

```bash
  https://github.com/limonPRO/BookStore.git
```

Go to the project directory

```bash
  cd BookStore
```

Install dependencies

```bash
  npm install
```

Set up environment variables
- Create a .env file in the root directory and add the following variables:

```bash
PORT = 4000

DB_CLIENT="mysql"
DB_HOST = "localhost"
DB_DATABASE= "bookstore1"
DB_USER = "root"
DB_PASSWORD = ""
DB_PORT = 8080

JWT_SECRET = "secret"
```
Database Setup
- Run migrations to create database tables

```bash
 npx knex migrate:latest
```
run the server
```bash
  npm run start
```


