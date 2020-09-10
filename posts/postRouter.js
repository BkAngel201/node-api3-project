const express = require('express');

const router = express.Router();
const Posts = require('./postDb')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving Post Info!"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.getById(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving Post Info!"})
    })
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.remove(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving Post Info!'})
    })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.update(id, req.body) 
    .then(response => {
      if(response === 1) {
        res.status(200).json({id: parseInt(id), ...req.body})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving Post Info!'})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Posts.getById(id)
    .then(response => {
      if(response !== undefined) {
        req.post = response
        next()
      } else {
        res.status(404).json({ message: "The Post with that ID is not in the DB."})
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving Post Info!'})
    })
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
