# Contact Manager

This is an online contact manager. A user is able to register an account, log in to their account, add contacts, and delete contacts.

## Website

https://cryptic-brook-85759.herokuapp.com


### Current Issues

1. The contacts are being shared with all users.
2. There is no search feature.
3. When a user registers, it will say the email is invalid, however, this is because I forgot to change the code when copying console.logs() messages to alert() messages.


## Built With

  [MEAN] - building dynamic web sites and web applications.

## API

  Located in routes/users.js and routes/contacts.js

## Schemas

  Database schemas are located in models/user.js and models/contact.js



## How to use

### Currently, our application is programmed for deployment. To run the app:
  1. Go to angular-src/src/app/services/authenticate.service.ts and change

  "return this.http.post('/api/register', user, {headers: headers})"
  to
  "return this.http.post('http://localhost:3000/api/register', user, {headers: headers})"

  and so on...

  just add "http://localhost:3000" in front of every line that has the following:
  return this.http.post('/api/...')
  return this.http.post('/user')

  these lines are:
  18, 25, 34, 40, 46, 53, 58


  2. Install angular/cli in the angular-src directory by:
  "npm install @angular/cli --save"

  3. On the COP4331C-18Spring-Group12-Small-master and COP4331C-18Spring-Group12-Small-master/angular-src directory run "npm install"

  4. Open two terminals and:
  in the COP4331C-18Spring-Group12-Small-master directory, run "node app.js"

  [OPTIONAL]: in the COP4331C-18Spring-Group12-Small-master/angular-src directory, run "ng build"
  in the COP4331C-18Spring-Group12-Small-master/angular-src directory, run "ng serve"

## Database

  The database is stored in my mlab.com account however this can be changed if you change the following:

  Go to config/database.js and change line 2 from "'database: 'mongodb://steven:chen@ds117848.mlab.com:17848/users',"
  to "database: 'mongodb://localhost:27017/users',"

  and run mongodb and it will store the data in the local mongodb database
