const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
      type: String,
      required: true,
      unique: true
    },
    path: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', fileSchema);