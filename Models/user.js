const mongoose=require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const userSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    created_by:{
        type:String,
        required:true,
    },
    created_at:{
        type: Date,
        default:Date,
    },
    updated_at:{
        type: Date,
        default:Date.now(),
    },
    title:{
        type:String,
        required:true,
    },
    profile_pic:{
        type:String,
    },
    _id:{
        type:Number,
        autoIncrement:true,
        primaryKey:true,
    }
})
userSchema.plugin(autoIncrement.plugin, 'users');
mongoose.model('users',userSchema);


module.exports=mongoose.model('users');
