const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

const database = {
    users : [
        {
            id: 123,
            name: 'youssef',
            email: 'youssef@gmail.com',
            password: 'password',
            entries: 0,
            joined: new Date(),
        }
    ]
};

app.get('/',(req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.send(400).json("error");
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: 124,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
    })
    res.json("added sucssfully");
})

app.listen(3000, () => {
    console.log('app is running in port 3000');
})


/*
/signin ==> POST = succes/fail
/register ==> POST = user
/profile/:userId ==> GET = user
/image ==> PUT ==> userCount



*/