const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uniqueValidator = require('mongoose-unique-validator');

const bannerSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: 'Please enter the banner ID'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter the banner name'
  },
  target: {
    type: [String],
    default: undefined,
    required: 'Please enter the target segments'
  }
});

// Not really needed here, but would like to standardise the error message format
bannerSchema.plugin(uniqueValidator);

const bannerModel = mongoose.model('Banner', bannerSchema);

module.exports = bannerModel;