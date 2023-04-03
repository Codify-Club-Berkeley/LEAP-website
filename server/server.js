const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/users')
//const routes = require('./routes/record.js');
const dbConfig = require("./config/dbConfig.js");

require('dotenv').config()
 
const app = express();
const http = require('http').Server(app);


const PORT = process.env.PORT || 4000; 

const io = require('socket.io')(http);
//app.use('/', routes); 

/*const io = require('socket.io')(server, {
  pingTimeout: 60000, 
  cors: {
    origin: "http://localhost:3000"
  }
})*/ 
 

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());
 
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

// routes
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/messagingRoutes')(app); 

const URI = process.env.MONGO_URI;  
db.mongoose
  .connect("mongodb+srv://michelle:LWukDpV2Dc9oxVYW@leap.lucy7xm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "student"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'student' to roles collection");
        });
  
        new Role({
          name: "tutor"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'tutor' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }


/*mongoose
 .connect(process.env.MONGO_URI)
 .then(() => {
  console.log('Connected to the Database successfully');
 })
 .catch(err => {
  console.error("Connection error", err);
  process.exit();
});
 
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
}); */ 

io.on('connection', (socket) => {
  console.log("connected to socket.io"); 
  // Get the last 10 messages from the database.
  /*Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
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
  }); */ 
});
 
const server = app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})
