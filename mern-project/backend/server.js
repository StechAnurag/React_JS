const express = require('express');
require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log('Server started on port : ' + PORT));
