const  mongoose=require('mongoose');

const ChatSchema = mongoose.Schema({
    message: { type: String },
    sender: { type: String },
    //timestamp: { type: Date, default: Date.now }
}, { versionKey: false });

const DataSchema=mongoose.Schema({
    batch:{type:String},
    section:{type:String},
    courseCode:{type:String},
    courseTitle:{type:String},
    email:{type:String},
    chat:[ChatSchema],
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const CourseTeacherGroupModel=mongoose.model('CourseTeacherGroupModel',DataSchema);
const ChatModel = mongoose.model('ChatModel', ChatSchema);
module.exports = CourseTeacherGroupModel


