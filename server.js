var port = process.env.port || 3000;

//Node.js and third party modules.
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs'); //key-value pair. Here, we are setting view engine which express will use which is hbs.

//Register Partials
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//Register Helper
hbs.registerHelper('convertToUpperCase', (text) => {
    return text.toUpperCase();
});

//Routing

app.use((request, response, next) => { //Here, app.use() registers express middle ware and take middle ware function as an argument.
    var logJSONObj = {
        URL: request.url,
        Method: request.method,
        Time: new Date().toString()
    };

    fs.appendFile('log.log', `URL: ${logJSONObj.URL} --- Method: ${logJSONObj.Method} --- Time: ${logJSONObj.Time}`, (error) => {
        if (error) {
            console.log('Unable to append to file log.json.');
        }
    });

    next();
});

app.use((request, response, next) => {
    //response.render('maintainance.hbs');
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('home.hbs', { //Here, parameters are page name and the object passed to the page for data.
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home page.',
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.listen(port, () => {
    console.log(`Started server at port ${port}.`);
});