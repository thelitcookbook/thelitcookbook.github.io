const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.static('public')); // Serve static files from the "public" directory

// Connect
