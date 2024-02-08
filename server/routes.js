const express = require("express");
const app = express();
const connect = require("./db");
const path=require('path')
const routes = express.Router();
routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'..','Client','index.html'))
});

routes.get("/fetch", (req, res) => {
  connect.query(`SELECT * FROM user`, (err, result) => {
    if (err) throw err;
    result=JSON.stringify(result)
    res.send(result)
    
  });
});

routes.post("/add", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const address = req.body.address;
try{ 
connect.query(
    `INSERT INTO user (id,name,mobile,email,address) VALUES('${id}','${name}',${mobile},'${email}','${address}')`,
    (err, result) => {
      if (err) {
        if(err.errno==1062)
        res.send(false)

    }
     else res.send(true);
    }
  )}
catch{
  res.send(false)
}  
})


routes.put('/update',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const address = req.body.address;
    connect.query(`UPDATE user  SET name='${name}',mobile='${mobile}',email='${email}',address='${address}' WHERE id=${id}`,(err,result)=>{
        if (err) throw err;
        res.send(true)
    })
})

routes.delete('/delete',(req,res)=>{
    connect.query(`DELETE FROM user WHERE id= ${req.body.id}`,(err,result)=>{
        if (err) throw err;
       else 
       
      res.send(true)
    })
})


module.exports = { routes };
