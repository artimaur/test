const connection = require('./database.js');
function addData(req,res){
const data=req.body;
 if (Array.isArray(data)) {
    const values = data.map(student => [student.student_id,student.name,student.class]);
connection.query("insert into students (student_id,name,class)values ?",[values],(error,result)=>{
     if(error)return res.status(500).send(error.message);
    res.send(`${result.affectedRows} data inserted successfully!`);
});
 } else {
    return res.status(400).send("Input must be an array of users.");
  }
}

function getdata(req,res){
    connection.query("select * from students",function(error,result){
        if(error)return res.status(500).send(error.message);
        res.send(result);
    });
}





function adcourse(req,res){
const data=req.body;
 if (Array.isArray(data)) {
    const values = data.map(course => [course.course_id,course.course_name,course.teacher]);
connection.query("insert into courses(course_id,course_name,teacher)values ?",[values],(error,result)=>{
     if(error)return res.status(500).send(error.message);
    res.send(`${result.affectedRows} data inserted successfully!`);
});
 } else {
    return res.status(400).send("Input must be an array of users.");
  }
}

function getcourse(req,res){
    connection.query("select * from courses",function(error,result){
        if(error)return res.status(500).send(error.message);
        res.send(result);
    });
}


function addmark(req,res){
const data=req.body;
console.log(req.body);
 if (Array.isArray(data)) {
    const values = data.map(marks=> [marks.id,marks.student_id,marks.course_id,marks.marks_obtained]);
connection.query("insert into marks(id,student_id,course_id,marks_obtained)values ?",[values],(error,result)=>{
     if(error)return res.status(500).send(error.message);
    res.send(`${result.affectedRows} data inserted successfully!`);
});
 } else {
    return res.status(400).send("Input must be an array of users.");
  }
}

function getmark(req,res){
    connection.query("select * from marks",function(error,result){
        if(error)return res.status(500).send(error.message);
        res.send(result);
        
    });
}


module.exports = {addData,getdata,adcourse,getcourse,addmark,getmark};