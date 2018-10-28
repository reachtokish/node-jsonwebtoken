const express = require('express');
const jwt = require('jsonwebtoken');

const secretKey = 'KkIiSsHhOoRrEe';

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Node JsonWebtoken'
    })
})

app.post('/post', verifyToken, (req, res) => {
    // console.log(req);
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: 'Post Created...',
                ...authData
            })
        }
    })
})

app.post('/login', (req, res) => {
    jwt.sign({username: 'kishore', password: 'reachtokish'}, secretKey, {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        })
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    }
    else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log("App listening on port 3000"));