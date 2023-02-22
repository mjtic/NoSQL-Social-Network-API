const {Schema, model} = require('mongoose');
const format_date = require('../utils/helpers')
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
    {
      thoughtText:{
        type: String,
        minlength:1,
        maxlength:280,
        required: true,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
        get:timestamp=>format_date(timestamp)
      },
      username: {
        type: String,
        required:true,
      },
      reactions: [
        reactionSchema
      ] 
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;