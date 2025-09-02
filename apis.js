const connection = require('./database.js');
const secret_key = 'hellojs';
var jwt = require('jsonwebtoken');

function addData(req, res) {
    const data = req.body;
    console.log("recieved data:", data);
    
    if (Array.isArray(data)) {
        const values = data.map(student => [student.student_id, student.name, student.class]);
        connection.query("insert into students (student_id,name,class)values ?", [values], (error, result) => {
            if (error) return res.status(500).send(error.message);
            res.send(`${result.affectedRows} data inserted successfully!`);
        });
    }
    else {
        return res.status(400).send("Input must be an array of users.");
    }
}
// const token=jwt.sign({key:value},hellojs,{expiresIn:'1d'});
// return res.json({token});


function login(req, res) {
    const { name } = req.body;
    //console.log(req.body);
    connection.query(`select * from students where name='${name}'`, (error, data) => {
        if (data.length > 0) {
            const token = jwt.sign({ name: name }, secret_key, { expiresIn: '1d' });
            return res.send({ token })
        } else {
            return res.send({ message: "Please enter valid user name." })
        }
    })
}




function adcourse(req, res) {
    const data = req.body;
    if (Array.isArray(data)) {
        const values = data.map(course => [course.course_id, course.course_name, course.teacher]);
        connection.query("insert into courses(course_id,course_name,teacher)values ?", [values], (error, result) => {
            if (error) return res.status(500).send(error.message);
            res.send(`${result.affectedRows} data inserted successfully!`);
        });
    } else {
        return res.status(400).send("Input must be an array of users.");
    }
}

function getcourse(req, res) {
    connection.query("select * from courses", function (error, result) {
        if (error) return res.status(500).send(error.message);
        res.send(result);
    });
}


function addmark(req, res) {
    const data = req.body;
    console.log(req.body);
    if (Array.isArray(data)) {
        const values = data.map(marks => [marks.id, marks.student_id, marks.course_id, marks.marks_obtained]);
        connection.query("insert into marks(id,student_id,course_id,marks_obtained)values ?", [values], (error, result) => {
            if (error) return res.status(500).send(error.message);
            res.send(`${result.affectedRows} data inserted successfully!`);
        });
    } else {
        return res.status(400).send("Input must be an array of users.");
    }
}

function getmark(req, res) {
    connection.query("select * from marks", function (error, result) {
        if (error) return res.status(500).send(error.message);
        res.send(result);

    });
}


module.exports = { addData, adcourse, getcourse, addmark, getmark, login };