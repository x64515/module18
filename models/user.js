const { Schema, model, Types } = require('mongoose');
const {isEmail} = require( 'validator');

const UserSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            validate: [ isEmail, 'Please fill a valid email address'],
            
        },

        thoughts:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        friends:[{
            type:Schema.Types.ObjectId,
            ref:'User'
        }],

    },
    {
    toJson:{
        virtuals: true,
        getters: true,
    },
    id:false
}
);
    UserSchema.virtual('friendCount').get(function(){
        return this.friends.length;
    });
    
const Comment = model('User', UserSchema);

module.exports = User;