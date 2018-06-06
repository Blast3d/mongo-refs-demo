const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }], // document linking... AKA REFS
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }] // ref needs to match a mongoose.model
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
