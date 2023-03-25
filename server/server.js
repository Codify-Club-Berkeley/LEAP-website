const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/users')
const routes = require('./routes/record.js');
 

 
require("dotenv").config({
 path: path.join(__dirname, "../env")
});
 
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
 
const PORT = process.env.PORT || 4000;
 
mongoose
 .connect('mongodb://localhost/server')
 .then(() => {
  console.log('Connected to the Database successfully');
 });
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    } 
    res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
    next(); 
 } 
});

io.on('connection', (socket) => {

  // Get the last 10 messages from the database.
  Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      name: msg.name,
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});
 
app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})