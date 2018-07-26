[![Build Status](https://travis-ci.org/blackshady/MyDiary.svg?branch=develop)](https://travis-ci.org/blackshady/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/blackshady/MyDiary/badge.svg)](https://coveralls.io/github/blackshady/MyDiary)
[![Maintainability](https://api.codeclimate.com/v1/badges/94c0b36aa74409c8e81b/maintainability)](https://codeclimate.com/github/blackshady/MyDiary/maintainability)
# MyDiary
MyDiary is an online journal where users can pen down their thoughts and feelings.


## Table of Contents

 * [Technologies](#technologies)
 * [API Endpoints](#api-endpoints)
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    
    
### Pivotal Tracker
Check [Here](https://www.pivotaltracker.com/n/projects/2183351)

### Template
Template is hosted [Here](https://blackshady.github.io/MyDiary/UI/pages)

### API Deployment
API Endpoint is hosted [Here](https://my-1-and-only-diary.herokuapp.com) 
## Technologies

* [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment
* [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework
* [Mocha](https://mochajs.org/) - JavaScript test framework
* [Chai](http://www.chaijs.com/) - A BDD / TDD assertion library 
* [Yarn](https://www.yarnpkg.com/) - Dependency Manager

## Style guide
* [Airbnb](https://github.com/airbnb/javascript) - Javascript style guide
* [SMACSS](https://smacss.com/book/categorizing) - Css style guide

## Features
  * Users can create an account and log in
  * Users can view all entries to their diary
  * Users can view the contents of a diary entry
  * Users can add or modify an entry
  *  Users can set and get daily notifications that prompt them to add an entry to their diary

  ## Getting Started
 ### Prerequisites
 Ensure you have NodeJS installed on your computer by entering  `node -v ` on your terminal. If you don't have NodeJS installed go to the [NodeJS Website](https://nodejs.org/en/download/), and follow the download instructions
### Installation

Clone the app
* ``` git clone https://github.com/blackshady/MyDiary.git```

Install all the packages
* ``` yarn install ```

Run the server
*  ``` yarn start ```

Server listens on port 9000
* Navigate to your browser and input the url [localhost:9000](http://localhost:9000/)

## Testing
Run Test case
* ```yarn test```

Test Api 
* [Postman](https://getpostman.com/)

## Working Routes
|	Endpoint	            | Functionality         |
|-----------------------|:---------------------:|
|GET /entries           | Fetch all entries     |   
|GET /entries/:entryId  | Fetch a single entry  |
|POST /entries          | Create an entry       |
|PUT /​entries​/:entryId​  | Modify an entry       |

## Some Important Dependencies
  * [Babel](https://babeljs.io/) - JavaScript Compiler
  * [Eslint](https://eslint.org/) - JavaScript linting utility
  * [Morgan]() and [Wiston](https://github.com/winstonjs/winston) -   logger 
