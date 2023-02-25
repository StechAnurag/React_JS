const path = require('path');
const express = require('express');
const morgan = require('morgan');
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

app.use(morgan('dev'));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

//  Server Frontend Build
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join('../frontend/build')));

  // avoid breaking of app on reload
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Welcome to support desk API'
    });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log('Server started on port : ' + PORT));
