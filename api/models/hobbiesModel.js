const mongoose = require('mongoose');

const HobbiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const HobbyModel = mongoose.model('Hobby', HobbiesSchema);

module.exports = HobbyModel;
