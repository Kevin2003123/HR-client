const mongoose = require('mongoose');

const PendingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  pending: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },

      avatar: {
        type: String,
        default: ''
      },

      fullName: {
        type: String
      },

      workPosition: {
        type: String
      },

      isCompleted: {
        type: Boolean,
        default: false
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pending = mongoose.model('pending', PendingSchema);
