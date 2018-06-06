const router = require('express').Router();
const Hobby = require('../models/hobbiesModel');

router
  .route('/')
  .post((req, res) => {
    const { name } = req.body;
    const newHobby = new Hobby({ name });
    newHobby
      .save()
      .then(savedHobby => {
        res.status(201).json(savedHobby);
      })
      .catch(err => res.status(500).json({ error: err }));
  })
  .get((req, res) => {
    Hobby.find()
      .then(hobbies => res.json(hobbies))
      .catch(err => res.status(500).json({ error: err }));
  });

module.exports = router;
