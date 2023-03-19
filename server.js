const session = require('express-session');
const MongoStore = require('connect-mongo');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const app = express();

app.use(express.static('public')); // Serve static files from the "public" directory

app.use(session({
    secret: '5@;3l?qtmV1T(p76n',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        client: client,
        dbName: 'thelitcookbook'
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
// Connect to MongoDB and start the server
MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');
    const db = client.db('thelitcookbook');

    app.post('/register', express.json(), async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            res.sendStatus(400);
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { username, password: hashedPassword };
            await db.collection('users').insertOne(user);
            res.sendStatus(201);
        } catch (error) {
            console.error('Error creating account:', error);
            res.sendStatus(500);
        }
    });

    // Add other route handlers here if needed

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});

//checking to see if user is logged in
app.get('/is-logged-in', (req, res) => {
    if (req.session.userId) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

//I am adding login functionality
app.post('/login', express.json(), async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    try {
        const user = await db.collection('users').findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.sendStatus(401); // Unauthorized
            return;
        }

        req.session.userId = user._id;
        res.sendStatus(200);
    } catch (error) {
        console.error('Error during login:', error);
        res.sendStatus(500);
    }
});

//I am adding logout functionality
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error during logout:', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        res.status(409).send('User already exists');
        return;
    }

    // Create a new user and save it to the database
    const user = new user({ username, password });
    await user.save();

    res.sendStatus(201);
});

