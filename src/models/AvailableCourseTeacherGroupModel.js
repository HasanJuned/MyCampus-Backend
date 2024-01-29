const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    batch:{type:String},
    section:{type:String},
    courseCode:{type:String},
    courseTitle:{type:String},
    email:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const AvailableCourseTeacherGroupModel=mongoose.model('availableCourseTeacher',DataSchema);
module.exports=AvailableCourseTeacherGroupModel

