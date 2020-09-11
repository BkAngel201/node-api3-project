const express = require('express');
const cors = require('cors')

const server = express();

const UsersRouter = require('./users/userRouter')
const PostsRouter = require('./posts/postRouter')
server.use(cors())
server.use(express.json())

server.use(logger)

server.use('/api/users', UsersRouter)
server.use('/api/posts', PostsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date()
  console.log(`${req.method} -- ${req.url} -- ${time.toLocaleString()}`);
  next()
}

module.exports = server;
