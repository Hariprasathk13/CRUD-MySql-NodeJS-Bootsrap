const mysql=require('mysql2');

const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
})

con.connect(err=>{
    if (err) throw err;
    console.log('db connected');
})

module.exports=con;

