const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

const database = {
    users : [
        {
            id: 121,
            name: 'youssef',
            email: 'youssef@gmail.com',
            password: 'password',
            entries: 0,
            joined: new Date(),
        },
        {
            id: 122,
            name: 'youssef',
            email: 'youssef@gmail.com',
            password: 'password',
            entries: 0,
            joined: new Date(),
        },
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
        res.status(400).json("error");
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
    res.json("added successfully");
})

app.get('/profile/:userId', (req, res) => {
    const { userId }  = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id ==  userId) {
            found = true;
            res.json(user);
        } 
    });
    if (!found) {
        res.status(404).json("no such user");
    }
})

app.put('/image', (req, res) => {
    const { userId }  = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id ==  userId) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    });
    if (!found) {
        res.status(404).json("no such user");
    }
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