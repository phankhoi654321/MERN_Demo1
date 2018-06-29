const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const timeZone = require('mongoose-timezone');

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    require: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    // mean who will like, that user is like or dislike
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    //each user can comment, and save it to array of object
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
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
    // default: new Date(Date.now() + 60 * 60 * 1000)
    // default: new Date(+new Date() + 7*60*60*1000)
  }
});

// PostSchema.plugin(timeZone , { paths: ['date'] });

module.exports = Post = mongoose.model("post", PostSchema);
