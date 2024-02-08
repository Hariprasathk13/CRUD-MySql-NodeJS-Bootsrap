const express=require('express');
const {routes}=require('./server/routes.js');
const app=express();
const bodyParser = require('body-parser');
const path=require('path')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
const PORT =8080;
app.use(routes);
app.use(express.static(path.join(__dirname,'Client','public')))
console.log(path.join(__dirname,'Client','public'));
app.listen(PORT,()=>{
    console.log(`Server Started @ ${PORT}`);
})
