//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  friends: [String]
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

//query for user's friends
User.findOne({ name: 'John Doe' })
  .exec((err, user) => {
    if (err) {
      console.error(err);
    } else {
      console.log(user.friendCount); // outputs the length of the user's friends array
    }
  });


//username
    //String
    //Unique
    //Required
    //Trimmed

//email
    //String
    //Unique
    //Required
    //Trimmed
    //Must match a valid email address (look into Mongoose's matching validation)

//thoughts
    //Array of _id values referencing the Thought model

//friends
    //Array of _id values referencing the User model (self-reference)
