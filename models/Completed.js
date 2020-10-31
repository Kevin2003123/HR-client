const mongoose = require('mongoose');

const CompletedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  completed: [
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

      skills: {
        attitude: {
          type: Number,
          default: 0
        },
        communication: {
          type: Number,
          default: 0
        },
        growth: {
          type: Number,
          default: 0
        },
        dependability: {
          type: Number,
          default: 0
        },
        productivity: {
          type: Number,
          default: 0
        },
        initiative: {
          type: Number,
          default: 0
        },
        innovation: {
          type: Number,
          default: 0
        },
        result: {
          type: Number,
          default: 0
        }
      },

      comment: {
        type: String
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

module.exports = Completed = mongoose.model('completed', CompletedSchema);
