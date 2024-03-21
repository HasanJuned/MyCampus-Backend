const TeacherTaskModel = require("../models/TeacherTaskModel")
const CourseTeacherGroupModel = require("../models/CourseTeacherGroupModel")
const ChatGroupModel = require("../models/ChatGroupModel")


/// createBatchSectionCourse
exports.createTask = async (req, res) => {

    try {
        let reqBody = req.body;
        reqBody.email = req.headers['email'];
        let result1 = await TeacherTaskModel.create(reqBody)
        res.status(200).json({status: 'success', data: result1});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}

/// same documents ey id te ekoi type er multiple object add korar code
exports.createSubjectGroupBatchSections = async (req, res) => {
    try {

        let id = req.params.id;
        let findId = {_id: id} // id found
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member]; // Assuming this is an array of member objects to add

        const mainDocument = await CourseTeacherGroupModel.findById(null);

        if (!mainDocument) {
            try {
                let result = await CourseTeacherGroupModel.create(reqBody)
                return res.status(200).json({ status: 'success', data: result });
            }catch (e){
                console.log("Main document not found");
                return res.status(200).json({ status: 'fail', data: 'Main document not found' });
            }


        }

        const existingMembers = mainDocument.member.filter(existingMember =>
            members.some(newMember => existingMember.name === newMember.name)
        );

        if (existingMembers.length === 0) {
            // Add new members to the array using $push
            mainDocument.member.push(...members);

            // Save the updated document
            const updatedDocument = await mainDocument.save();
            return res.status(200).json({ status: 'success', data: updatedDocument });
        } else {
            console.log("Group is already added");
            return res.status(200).json({ status: 'fail', data: 'One or more group already added' });
        }
    } catch (e) {
        console.error(e.toString());
        return res.status(200).json({ status: 'fail', data: e.toString() });
    }
};

exports.joinSubjectGroupBatchSections = async (req, res) => {
    try {

        let id = req.params.id;
        let findId = {_id: id} // id found
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member];

        let courseTeacherGroupDocument = await CourseTeacherGroupModel.find(); // document searching of other collections
        let idFind = req.params.id
        console.log(idFind)

        if (courseTeacherGroupDocument) {
            for (let i = 0; i < courseTeacherGroupDocument.length; i++) {
                const courseTeacherGroupDocuments = courseTeacherGroupDocument[i];
                const id3 = courseTeacherGroupDocuments._id;
                //const membersObjectId = courseTeacherGroupDocuments.member.map(member => member._id);

                if(id3.toString() === idFind){
                    console.log("Found document ID:", id3);

                    const existingMembers = courseTeacherGroupDocuments.member.filter(existingMember =>
                        members.some(newMember => existingMember.name === newMember.name)
                    );

                    if (existingMembers.length === 0) { /// existingMembers.length === 1 && count = 0
                        // Add new members to the array using $push
                        courseTeacherGroupDocuments.member.push(...members);

                        // Save the updated document
                        const updatedDocument = await courseTeacherGroupDocuments.save();
                        return res.status(200).json({ status: 'success', data: updatedDocument });
                    }else {
                        return res.status(200).json({ status: 'fail', data: 'Already added' });
                    }


                }
            }

        } else {
            console.log("No documents found in CourseTeacherGroupModel collection.");
        }

        const mainDocument = await ChatGroupModel.findById(findId);

        if (!mainDocument) {
            try {
                let result = await ChatGroupModel.create(reqBody)
                return res.status(200).json({ status: 'success', data: result });
            }catch (e){
                console.log("Main document not found");
                return res.status(200).json({ status: 'fail', data: 'Main document not found' });
            }
        }

    } catch (e) {
        console.error(e.toString());
        return res.status(200).json({ status: 'fail', data: e.toString() });
    }
};

exports.chatSubjectGroupBatchSections = async (req, res) => {
    try {

        let id = req.params.id;
        let id9 = req.params.otp;
        let findId = {_id: id} // id found
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member];

        let courseTeacherGroupDocument = await CourseTeacherGroupModel.find(); // document searching of other collections
        let idFind = req.params.id
        console.log(idFind)
        let count = 0

        if (courseTeacherGroupDocument) {
            for (let i = 0; i < courseTeacherGroupDocument.length; i++) {
                const courseTeacherGroupDocuments = courseTeacherGroupDocument[i];
                const id3 = courseTeacherGroupDocuments._id;
                const membersObjectId = courseTeacherGroupDocuments.member.map(member => member._id);
                console.log(membersObjectId)

                if(membersObjectId[i].toString() === id9){
                    console.log('found')
                }else{
                    console.log('not found')
                }

                // ono aslam

                // if(id3.toString() === idFind){
                //     console.log("Found document ID:", id3);
                //
                //     const existingMembers = courseTeacherGroupDocuments.member.filter(existingMember =>
                //         members.some(newMember => existingMember.name === newMember.name)
                //     );
                //
                //     if (existingMembers.length === 0) { /// existingMembers.length === 1 && count = 0
                //         // Add new members to the array using $push
                //         courseTeacherGroupDocuments.member.push(...members);
                //
                //         // Save the updated document
                //         const updatedDocument = await courseTeacherGroupDocuments.save();
                //         return res.status(200).json({ status: 'success', data: updatedDocument });
                //     }else {
                //         return res.status(200).json({ status: 'fail', data: 'Already added' });
                //     }
                //
                //
                // }
            }

        } else {
            console.log("No documents found in CourseTeacherGroupModel collection.");
        }

        const mainDocument = await ChatGroupModel.findById(findId);

        if (!mainDocument) {
            try {
                let result = await ChatGroupModel.create(reqBody)
                return res.status(200).json({ status: 'success', data: result });
            }catch (e){
                console.log("Main document not found");
                return res.status(200).json({ status: 'fail', data: 'Main document not found' });
            }


        }

        // const existingMembers = mainDocument.member.filter(existingMember =>
        //     members.some(newMember => existingMember.name === newMember.name)
        // );
        //
        // if (existingMembers.length === 0) {
        //     // Add new members to the array using $push
        //     mainDocument.member.push(...members);
        //
        //     // Save the updated document
        //     const updatedDocument = await mainDocument.save();
        //     return res.status(200).json({ status: 'success', data: updatedDocument });
        // } else {
        //     console.log("Group is already added");
        //     return res.status(200).json({ status: 'fail', data: 'One or more group already added' });
        // }
    } catch (e) {
        console.error(e.toString());
        return res.status(200).json({ status: 'fail', data: e.toString() });
    }
};




exports.chatGroup = async (req, res) => {

    try {

        let reqBody = req.body;
        reqBody.email = req.headers['email'];
        let result = await ChatGroupModel.create(reqBody)
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}

exports.deleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteTask = {_id: id}

        let result = await TeacherTaskModel.deleteOne(deleteTask)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }
}

exports.updateTaskStatus = async (req, res) => {

    try {

        let id = req.params.id;
        let courseCode = req.params.courseCode;
        let updateTask = {_id: id};
        let reqBody = {courseCode: courseCode};

        let result = await TeacherTaskModel.updateOne(updateTask, reqBody)
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }

}

exports.listTaskByStatus = async (req, res) => {

    try {

        let batch = req.params.batch;
        let email = req.headers['email']

        let result = await CourseTeacherGroupModel.find({email: email, batch: batch})
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }

}

/// showTeacherBatchList
exports.taskStatusCount = async (req, res) => {

    try {

        let email = req.headers['email'];
        let result = await TeacherTaskModel.aggregate([{$match: {email: email}}, {
            $group: {
                _id: {
                    batch: "$batch", section: "$section", courseCode: "$courseCode", courseTitle: "$courseTitle"
                }, sum: {$count: {}}
            }
        }]);
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}


exports.AvailableCourseAndTeacher = async (req, res) => {

    try {

        let result = await CourseTeacherGroupModel.find()
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}