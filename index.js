const express = require('express');
const jwt = require('jsonwebtoken')

const app = new express();
app.use(express.json());

let USERS = [];
let user_id = 0;
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(user => user.username === username);

    if(userExists) {
        res.status(403).json({
            msg: "Username already exists"
        })
        return;
    }

    USERS.push({
        "userId": user_id++,
        username,
        password
    })

    res.json({
        msg: "You have signed up"
    })
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(user => user.username === username && user.password === password);

    if(!userExists) {
        res.status(401).json({
            msg: "Incorrect credentials"
        })
        return;
    }

    const token = jwt.sign({
        userId: userExists.userId,
        username: userExists.username
    }, "hammer-time")
    res.json({
        token
    })
})




app.listen(3000);