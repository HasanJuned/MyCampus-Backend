const  mongoose=require('mongoose');

// const ChatSchema = mongoose.Schema({
//     message: { type: String },
//     sender: { type: String },
//     timestamp: { type: Date, default: Date.now }
// }, { versionKey: false });
//

const MemberInfoSchema = mongoose.Schema({
    name: { type: String },
    batch: { type: String },
    department: { type: String },
    section: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const DataSchema=mongoose.Schema({
    batch:{type:String},
    section:{type:String},
    courseCode:{type:String},
    courseTitle:{type:String},
    email:{type:String},
    member:[MemberInfoSchema],
    //chat:[ChatSchema],
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const CourseTeacherGroupModel=mongoose.model('CourseTeacherGroupModel',DataSchema); // ekane per group er jonno alada alada collection banaate hobe
//const ChatModel = mongoose.model('ChatModel', ChatSchema);
const MemberModel = mongoose.model('MemberInfo', MemberInfoSchema);
module.exports = CourseTeacherGroupModel


