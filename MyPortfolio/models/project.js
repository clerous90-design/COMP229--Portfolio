const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  image: { type: String },
  repoUrl: { type: String },
  liveUrl: { type: String },
  completion: { type: Date }
});

module.exports = mongoose.model('Project', projectSchema);