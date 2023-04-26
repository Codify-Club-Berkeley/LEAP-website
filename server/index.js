import socketIO from "socket.io";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

import mongoConnect from './config/mongo';
import Message from './models/message';
import fileUploader from "./controllers/fileUploader";

const io = socketIO(process.env.SOCKET_PORT);


//const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
//const io = require('socket.io')(http);

const uri = "mongodb+srv://michelle:LWukDpV2Dc9oxVYW@leap.lucy7xm.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

//const Message = require('./Message');
const mongoose = require('mongoose');

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to the Database successfully');
 });;

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

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

   // console.log(msg.content)

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});
/*
const findResult = await orders.find({
  name: "Lemony Snicket",
  date: {
    $gte: new Date(new Date().setHours(00, 00, 00)),
    $lt: new Date(new Date().setHours(23, 59, 59)),
  },
});
*/

http.listen(port, () => {
  console.log('listening on *:' + port);
}); 