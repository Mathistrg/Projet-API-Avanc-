const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" }
});

const User = mongoose.model('compte', UserSchema);

module.exports = User;