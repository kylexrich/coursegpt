require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/connectToDB');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const chatRoutes = require('./routes/chat');
const feedbackRoutes = require('./routes/feedback');
const courseRoutes = require('./routes/course');
const schoolRoutes = require('./routes/school');
const getAllRoutes = require('./routes/all');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');

start();

function start() {
  const app = express();
  const port = process.env.PORT || 3001;
  setupExpress(app);
  setupRoutes(app);
  if (process.env.NODE_ENV !== 'development') serveBuild(app);
  run(app, port);
}

function setupExpress(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(
      cors({
        origin: 'http://localhost:3000', // Stack Overflow, Google, or ChatGPT helped me with this (Can't Remember)
        credentials: true,
      })
    );
  } else {
    app.use(cors());
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(cookieParser());
}

function setupRoutes(app) {
  app.use(
    '/api/users/:userId/chatIds/:chatId/messages/:messageId/feedback',
    feedbackRoutes
  );
  app.use('/api/users/:userId/chats/:chatId/messages', messageRoutes);
  app.use('/api/users/:userId/chats', chatRoutes);
  app.use('/api/schools/:schoolId/courses', courseRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/schools', schoolRoutes);
  app.use('/api', getAllRoutes);
}

function serveBuild(app) {
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
}

function run(app, port) {
  connectToDB().then(() => {
    app.listen(port, () => {
      console.log(`Running on port ${port}! URL: http://localhost:${port}/`);
    });
  });
}
