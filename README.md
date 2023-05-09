# Northcoders House of Games API

## Introduction

TODO - write introduction about project

## Setup

This project uses [dotenv](https://www.npmjs.com/package/dotenv) to manage local environment variables. As well, this project has two databases: test and development.

You will need to create two .env files for your project: .env.test and .env.development. After this, you'll need to add the correct PGDATABASE names into these files. For example:

```
// .env.development 
PGDATABASE=nc_games

// .env.test
PGDATABASE=nc_games_test
```
