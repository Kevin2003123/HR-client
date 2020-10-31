const mongoose = require('mongoose');

const EmployeeDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  fullName: {
    type: String
  },

  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  mobilePhone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  workPosition: {
    type: String,
    required: true
  },

  pendingReviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],

  completedReviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],

  skill: {
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
  skills: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      attitude: {
        type: Number
      },
      communication: {
        type: Number
      },
      growth: {
        type: Number
      },
      dependability: {
        type: Number
      },
      productivity: {
        type: Number
      },
      initiative: {
        type: Number
      },
      innovation: {
        type: Number
      },
      result: {
        type: Number
      }
    }
  ],

  comments: [
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

module.exports = EmployeeData = mongoose.model(
  'EmployeeData',
  EmployeeDataSchema
);
