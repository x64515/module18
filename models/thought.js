const {Schema, model, Types} = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
          },
          userName: {
            type: String,
            required: true,

          },
          createdAt: {
            type: Date,
            default: Date.now,
          }
        },
        {
          toJSON: {
            getters: true
          }
        }
      );

const ThoughtSchema = new Schema(
   {
       thoughtText:{
           type:String,
           required: true,
           min: 1,

           max: 280,
       },

       createdAt:{
           type: Date,
           Default: Date.now,
           get: createdAtVal => moment(createdAtVal),
       },
       userName:{
           type:String,
           required: true,
       },

       reactions:[reaction]
   },
  {
   toJSON: {
     virtuals: true,
     getters: true
  },
  id: false,
}
);
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('comment', ThoughtSchema);

module.exports = Thought;
