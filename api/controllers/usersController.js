const router = require('express').Router();
const User = require('../models/usersModel');

router
  .route('/')
  .get((req, res) => {
    User.find({}) // filter, .select(), .where(), .sort()
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    const user = ({ username, firstname, lastname } = req.body);
    const newUser = new User(user);
    newUser
      .save()
      .then(savedUser => res.status(201).json(savedUser))
      .catch(err => res.status(500).json({ error: err }));
  });

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('friends', 'username firstName lastName -_id') // { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.
    .populate('hobbies', 'name -_id')
    .then(foundUser => res.json(foundUser))
    .catch(err => res.status(500).json({ error: err }));
});

router.route('/:id/friend').post((req, res) => {
  // api/users/5b18194b7312ba4001c20942/friend
  const { id } = req.params;
  const { friendID } = req.body;
  User.findById(id)
    .then(foundUser => {
      foundUser.friends = [...foundUser.friends, friendID];
      foundUser
        .save()
        .then(savedUser => res.status(201).json(savedUser))
        .catch(saveError => res.status(500).json({ error: saveError.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.route('/:id/hobby').post((req, res) => {
  const { id } = req.params;
  const { hobbyID } = req.body;
  User.findById(id)
    .then(foundUser => {
      foundUser.hobbies = [...foundUser.hobbies, hobbyID];
      foundUser
        .save()
        .then(savedUser => res.status(201).json(savedUser))
        .catch(saveError => res.status(500).json({ error: saveError.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;

// Fred :::: 5b17edd8f08709333a7dc430
// Barney :::: 5b17edeaf08709333a7dc431
// Rock Digging :::: 5b17ebe552b95a32c34e99ac
