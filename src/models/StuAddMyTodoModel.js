const  mongoose=require('mongoose');
const StuAddMyTodoSchema=mongoose.Schema({
    studentId:{type:String},
    title:{type:String},
    date:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const StuAddMyTodoModel=mongoose.model('stuAddMyTodoSchema',StuAddMyTodoSchema);
module.exports=StuAddMyTodoModel

