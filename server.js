const express = require('express');
const app = express();
const connectDb = require('./config/db');
const path = require('path');

//connect to the server
connectDb();

//init Middleware
app.use(
  express.json({
    extended: false
  })
);

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/adminPage', require('./routes/api/adminPage'));
app.use('/api/assignment', require('./routes/api/assignment'));

//Serve static assets in porduction
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
