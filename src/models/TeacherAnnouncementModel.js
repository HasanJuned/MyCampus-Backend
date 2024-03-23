const  mongoose=require('mongoose');

const teacherAnnouncement = mongoose.Schema({
    announcement: { type: String },
    batch: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const TeacherAnnouncement=mongoose.model('TeacherAnnouncement',teacherAnnouncement);
module.exports = TeacherAnnouncement


