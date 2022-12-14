const express = require('express');
require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log('Server started on port : ' + PORT));
