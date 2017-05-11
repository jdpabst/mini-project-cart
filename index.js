const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'alfkejqio3i2jrlfjlsdjf',
    resave: false,
    saveUninitialized: false,
}));

app.post('/api/cart', (req, res) => {
    // add req.body to users sessions
    // if the user does not have a cart:
    if(!req.session.cart){
        req.session.cart = [];
    }
    if(!req.body.name) {
        return res.status(400).send('You need to send me a product');
    }

    var cart = req.session.cart;
    cart.push(req.body);
    res.status(200).send('ok');

})

app.get('/api/cart', (req, res) => {
    // return users cart from session
    res.status(200).json(req.session.cart)

})

app.listen(3000, () => {console.log('listening on 3000')})