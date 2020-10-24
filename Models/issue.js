const mongoose=require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const issueSchema=mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
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
    assignee:{
        type:String,
        required:true,
    },
    _id:{
        type:Number,
        autoIncrement:true,
        primaryKey:true,
    }
})
issueSchema.plugin(autoIncrement.plugin, 'issues');
mongoose.model('issues',issueSchema);


module.exports=mongoose.model('issues');
