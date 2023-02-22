const {Schema, model} = require('mongoose');
const userSchema = new Schema(
    {
      username:{
        type: String,
        unique: true,
        trimmed: true,
        required: true,
      },
      email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref:'Thought',
        }
      ],
      friends: [
        {
            type: Schema.Types.ObjectId,
            ref:'User',
        }
      ] 
    },
    {
        toJSON:{
            virtuals: true,
        },
        id: false,
    }
);
userSchema.virtual('freindCount').get(function(){
    return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;

