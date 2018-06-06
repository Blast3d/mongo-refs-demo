const router = require('express').Router();
const User = require('../models/usersModel');

router
  .route('/')
  .get((req, res) => {
    if (Object.keys(req.query).length === 0) {
      User.find()
        .then(users => {
          res.json(users);
        })
        .catch(err => res.status(500).json({ error: err }));
    } else {
      const { sort } = req.query;
      User.find()
        .sort({ firstName: sort })
        .then(sortedUsers => res.json(sortedUsers))
        .catch(error => res.status(500).json({ error }));
    }
  })
  .post((req, res) => {
    const user = ({ username, firstName, lastName } = req.body);
    const newUser = new User(user);
    newUser
      .save()
      .then(savedUser => {
        res.status(201).json(savedUser);
      })
      .catch(err => res.status(500).json({ error: err }));
  });

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('hobbies', { name: 1, _id: 0 })
    .populate('friends', { firstName: 1, lastName: 1, _id: 0 })
    .then(populatedUser => {
      res.json(populatedUser);
    })
    .catch(err => res.status(500).json({ error: 'No no' }));
});

router.route('/:id/friend').post((req, res) => {
  const { id } = req.params;
  const { friendID } = req.body;
  User.findOne({ _id: id })
    .then(foundUser => {
      foundUser.friends = [...foundUser.friends, friendID];
      foundUser
        .save()
        .then(savedUser => {
          res.status(201).json(savedUser);
        })
        .catch(error => res.status(500).json({ error: err }));
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.route('/:id/hobby').post((req, res) => {
  const { id } = req.params;
  const { hobbyID } = req.body;
  User.findById(id)
    .then(foundUser => {
      foundUser.hobbies = [...foundUser.hobbies, hobbyID];
      foundUser
        .save()
        .then(savedUser => {
          res.status(201).json(savedUser);
        })
        .catch(errorSave => {
          res.status(500).json({ error: errorSave });
        });
    })
    .catch(errorLookup => res.status(500).json({ error: errorLookup }));
});

module.exports = router;

// Fred :::: 5b17edd8f08709333a7dc430
// Barney :::: 5b17edeaf08709333a7dc431
// Rock Digging :::: 5b17ebe552b95a32c34e99ac

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
