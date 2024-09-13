const  mongoose=require('mongoose');
const FacAddMyTodoSchema=mongoose.Schema({
    email:{type:String},
    title:{type:String},
    date:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const FacAddMyTodoModel=mongoose.model('facAddMyTodos',FacAddMyTodoSchema);
module.exports=FacAddMyTodoModel

