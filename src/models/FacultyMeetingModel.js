const  mongoose=require('mongoose');

const facultyMeeting = mongoose.Schema({
    title: { type: String },
    date: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const FacultyMeeting=mongoose.model('FacultyMeeting',facultyMeeting);
module.exports = FacultyMeeting


