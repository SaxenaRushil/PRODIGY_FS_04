const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const User = require('./models/User');
const ChatRoom = require('./models/ChatRoom');
const Message = require('./models/Message');

mongoose.connect('mongodb://localhost:27017/prodigytask4', { 
  // useNewUrlParser: true, useUnifiedTopology: true 
});

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'secret');
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Assuming your 'message' event emission in the backend looks like this
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', async (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      // Assuming `parsedMessage.sender` is the username
      const chatMessage = new Message({
        sender: parsedMessage.sender,
        content: parsedMessage.content
      });
      await chatMessage.save();
      io.emit('message', chatMessage); // Broadcast message to all connected clients
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});




server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
