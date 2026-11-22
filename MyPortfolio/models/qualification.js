const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: { type: String },
  year: { type: String },
  description: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Qualification', qualificationSchema);