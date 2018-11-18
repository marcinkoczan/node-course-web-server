const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    if(req.url != '/favicon.ico') {
        log = `${now}: ${req.method} ${req.url}`;

        fs.appendFile('server.log', log + '\n', (err) => {
            if(err) {
                console.log('Nie mogę dostać się do pliku');
            }
        })
    }

    //bez next() zapętli się
    next();
});
//kolejność use ma znaczenie
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear(); });

app.get('/', (req, res) => {
    let localData = {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello message',
    };

    res.render('about.hbs', localData);
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.listen('3001', () => {
    console.log('Server is up on port 3001');
});