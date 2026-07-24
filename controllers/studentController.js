import Student from "../models/student.js";

export function createStudent(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "Unauthorized Access you need to login first"
        })
        return;
    }

        if(!req.user.isAdmin){
            res.status(403).json({
                message : "Only Admins can create students"
            })
            return;
        }






    const newStudent = new Student({
        name : req.body.name,
        age : req.body.age,
        city : req.body.city,
    });

    newStudent.save()
    .then( ()=>{
            res.json({
                message: "Student Created Successfully",
            });
        })
        .catch((error) => {
            console.error("Error creating student:", error);
            res.status(500).json({
                message: "Error creating student",
            });
        });
}

export async function createStudentAsync(req, res) {
    try{ 
        const newStudent = new Student({
        name : req.body.name,
        age : req.body.age,
        city : req.body.city,
    });

    await newStudent.save()
    res.json({
        message: "Student Created Successfully",
    })

    }catch(error){
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Error creating student" });

    }
    
}

export function getStudents(req,res){
    
    Student.find().then(
        (students)=>{

            res.json(students)
            
        }
    )
}

