const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const app = express();

app.use(express.static('public')); // Serve static files from the "public" directory

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
