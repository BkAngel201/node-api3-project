const express = require('express');

const router = express.Router();
const Users = require('./userDb')
const Posts = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error Inserting the New User into the DB" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.insert({user_id: parseInt(id), ...req.body})
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error Inserting the New Post into the DB" })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(response => {
      console.log(response);
      res.status(200).json(response)
    })
    .catch(err=> {
      console.log(err);
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const user = req.user
  Users.getUserPosts(user.id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Error retrieving User Info!'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const user = req.user
  Users.remove(user.id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Error retrieving User Info!'})
    })
});

router.put('/:id', validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.update(id, req.body) 
    .then(response => {
      if(response === 1) {
        res.status(200).json({ id: parseInt(id), ...req.body})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving User Info!'})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Users.getById(id)
    .then(response => {
      if(response !== undefined) {
        req.user = response
        next()
      } else {
        res.status(404).json({ message: "The user with that ID is not in the DB."})
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving User Info!'})
    })
  
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body
  if(!body || body === {}) {
    res.status(400).json({ message: 'Please include request body' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body
  if(!body || body === {}) {
    res.status(400).json({ message: 'Missing post data' })
  } else {
    if(body.text) {
      next()
    } else {
      res.status(400).json({ message: 'missing required text field' })
    }
  }
}

module.exports = router;
