const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://m:uPygQp2rKgx8CG3@shop-cluster.edkwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

const whitelist = [
    'https://peaceful-temple-90106.herokuapp.com',
    'https://guarded-ridge-09602.herokuapp.com',
    'http://localhost:4200',
    'http://localhost:8080',
    'http://localhost:3000',
];

var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin',
        'Origin', 'Accept'
    ]
};

app.use(cors(corsOptions));

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba tortént', err);
})

require('./models/item.model');
require('./models/user.model');

const userModel = mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

passport.use('local', new localStrategy(function(username, password, done) {
    userModel.findOne({ username: username }, function(err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function(error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));

passport.serializeUser(function(user, done) {
    if (!user) return done('nincs megadva beléptethető felhasználó', null);
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    if (!user) return done("nincs user akit kiléptethetnénk", null);
    return done(null, user);
});

app.use(expressSession({ secret: 'prf2021webshopapptopsecretsecret', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

// ez a default root akkor ha az Angular külön fut pl. Firebase-en

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

// ez a rész akkor ha a node public mappájában van az Angular kliens

/* app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index')); */

// ---

const user = require("./routes/user");
const item = require("./routes/item");

app.use('/', user);
app.use('/', item);

app.use((req, res, next) => {
    console.log('ez a hibakezelo');
    res.status(404).send('A kert eroforras nem talalhato');
})

app.listen(port, () => {
    console.log('The server is running!');
})