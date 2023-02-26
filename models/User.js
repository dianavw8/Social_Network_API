  const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  
  const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
      },
       //Array of _id values referencing the Thought model
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      //Array of _id values referencing the User model (self-reference)
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true
      },
      id: false
    }
  );
  //query for user's friends
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;
