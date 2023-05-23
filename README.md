# Northcoders House of Games API

## Introduction

Backend server for example board game review website. Uses:

* JavaScript
* Node (built using v18.14.1)
* Express (built using 4.18.2)
* PostgreSQL (built using 14.7)
* Jest (built using 29.5.0)
* Jest-sorted (built using 1.0.14)
* Supertest (built using 6.3.3)
* PG (built using 8.11.0)
* dotenv (built using 16.0.3)

The above versions can be considered the minimal supported versions. In practice, earlier versions may work, however I advise making sure that you are using at least the above to avoid issues.

This server is hosted via [render](https://render.com) and is available [https://nc-be-games-puql.onrender.com](https://render.com).

## Setup

This project uses [dotenv](https://www.npmjs.com/package/dotenv) to manage local environment variables. As well, this project has two databases: test and development.

You will need to create two .env files for your project: .env.test and .env.development. After this, you'll need to add the correct PGDATABASE names into these files. For example:

```
// .env.development 
PGDATABASE=nc_games

// .env.test
PGDATABASE=nc_games_test
```
After this, you can install the Node modules using `npm install`. 

After doing this, you can setup the local PostgreSQL database by running `psql -f db/setup.sql`. 

You can then seed the development database by running `node db/run-seed`. You do not need to seed the test database as Jest will seed it automatically when running the test cases.

The tests can be run with `npm test`. 

The tests are located in `__tests__`. You can test the individual test cases using `npm test <filename>`. For example, `npm test __tests__/categories.controller.test`. 

However, Jest is intelligent enough to run the test files which just a unique identify for the file. For example, `npm test categories`, `npm test comments`, and so on, and the relevant test case will be run. 