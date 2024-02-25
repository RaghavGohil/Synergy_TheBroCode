const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },
  lastUpdated: {
    type: Date,
    required: false
  },
  dateCreated: {
    type: Date,
    required: true
  },
  fileIDs:
  {
    type: Array,
    required: false
  },
});

module.exports = mongoose.model('Projects', projectsSchema);