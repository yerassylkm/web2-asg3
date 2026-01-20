require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json()); 

app.use('/api', blogRoutes);

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('База подключена!'))
    .catch(err => console.log(err));

app.listen(8080, () => console.log('Сервер на 8080'));