const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const TestSchema = new Schema({
  // write schema here
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  age: Number,
  _id: Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  active: Boolean,
  address: AddressSchema,// brand new nested Schema
  friends: [{type: Schema.Types.ObjectId, ref: SomeModel}] // brand new Nested schema w/ 'linking'. refs
});

const AddressSchema = new Schema({
  street: String,
  zip: String,
  building: String
});

{ 
  "username": "coolUser@cooluser.com",
  "password": "IamSoCool",
  "age": 31,
  "_id": "5b17edd8f08709333a7dc430",
  "created_at": 2014-09-05 18:00:00.000,
  "active": true,
  "address": {
    "street": "123 Alpine Way",
    "zip": "55039",
    "building": "350"
  },
  "friends": ["5b17edeaf08709333a7dc431", "5b17ebe552b95a32c34e99ac"]
}

