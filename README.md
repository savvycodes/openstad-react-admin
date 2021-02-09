# React Admin implementation voor Openstad Api  
This is an react admin implementation for managing the Openstad REST Api.

## Starting
Running the react admin can be done by standard react script commands.

```
npm start
```

## Used in Admin panel and CMS
It's current implementation is embedded both in the CMS and admin panel.
Currently it's in Beta status, it has useful features such as import, but not complete yet.

## Testing
Jest is set up for unit testing. An externals Openstad Cypress test suite contains some test files for end to end test for testing the panel in a working version.

## Publishing NPM via travis
A travis script is added in the root, this runs test on every commit.

It needs the following ENV values set in the Travis interface:

```
NPM_EMAIL
NPM_AUTH_TOKEN
```
