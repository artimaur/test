const mysql=require('mysql2');
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"school_db",
    password:""
 });
 module.exports=connection;