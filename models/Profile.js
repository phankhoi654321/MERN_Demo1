const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, //get userId from 'users' collection
    ref: "users" //'users' is the collection
  },
  handle: {
    type: String,
    require: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    require: true
  },
  skills: {
    type: [String],
    require: true
  },
  bio: {
    type: String,
    require: true
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        require: true
      },
      company: {
        type: String,
        require: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        require: true
      },
      degree: {
        type: String,
        require: true
      },
      fieldofstudent: {
        type: String,
        require: true
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
