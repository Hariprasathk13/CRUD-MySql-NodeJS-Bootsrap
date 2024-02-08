const updatebtn=document.getElementById('updatebtn')
const sucess=  document.getElementById('success')
const failed=  document.getElementById('failed')
  const tbody=document.querySelector('tbody');
  var input=document.querySelectorAll('input')
  input[0].disabled=false

function  formmodal(){


input.forEach(f=>f.value="")
updatebtn.onclick=Add_OR_Update('add')
document.getElementById('formheader').innerText='Add New User '
updatebtn.innerHTML='Add'
input[0].disabled=false;
$('#formmodal').modal('show')
}
document.addEventListener('DOMContentLoaded', async ()=>{
  await fetch('/fetch')
  .then(val=>val.json())
  .then(msg=>{
  
    msg.forEach(m=>{
  // console.log(m);
  Appendtotable(m)  })
  } 
  )
  .catch(err=>{throw err})
  })
 async function Appendtotable(obj){

      const data=`

              <td>${obj.id}</td>
              <td>${obj.name}</td>
              <td>${obj.mobile}</td>
              <td>${obj.email}</td>
              <td>${obj.address}</td>
          
<td>     <button  class="delete btn btn-danger  fs-6 border-0" value="${obj.id}">delete</button>
<button class="edit fs-6 border-0 btn btn-warning" value="${obj.id}" >edit</button>
</td>  <td> 
          `
          
    var row=document.createElement('tr')
   row.innerHTML=data;

  tbody.append(row) 
}
  
 
setTimeout(()=>{
const deletebtn=document.querySelectorAll('.delete')
deletebtn.forEach(btn=>{
  
  btn.addEventListener('click',(e)=>{
    $('#deletemodal').modal('show')

document.getElementById('deletebtn').onclick=()=>{

     Deleteuser(e.target.value)
      tbody.removeChild(e.target.parentNode.parentNode)
      $('#deletemodal').modal('hide')

}
      
  })
})
const editbtn=document.querySelectorAll('.edit');
editbtn.forEach(btn=>{

btn.addEventListener('click',(e)=>{
let parent=e.target.parentNode.parentNode;
for(let i=0;i<5;i++){
input[i].value=parent.children[i].innerHTML;
}
updatebtn.onclick=Add_OR_Update('update',e.target.value);
document.getElementById('formheader').innerText='Update Existing User'
updatebtn.innerText='Save changes'
$('#formmodal').modal('show')

input[0].disabled=true  


  })
})

},2000);


function Add_OR_Update(route,id){
const form=document.querySelector('form')
form.addEventListener('submit',(f)=>{
f.preventDefault();
const formdata=new FormData(form)
let formbody= Object.fromEntries(formdata)

if(route=='add'){
fetch('/add',{
  method:'POST',
 headers:{
  'content-Type':'application/json'
 },
 body:JSON.stringify(formbody)})
.then(val=>val.json())
.then(msg=>{

if(msg==true){
$('#formmodal').modal('hide')
sucess.innerHTML='user added sucessfully'
$('#succeesmodal').modal('show')
Appendtotable(formbody)
}
else{
$('#formmodal').modal('hide')
failed.innerHTML='Unable to Add user';

$('#failedmodal').modal('show')

}
})}
else{
body=Object.assign({id:id},formbody)
fetch('/update',{
  method:'PUT',
 headers:{
  'content-Type':'application/json'
 },
 body:JSON.stringify(body)})
.then(val=>val.json())
.then(msg=>{
if(msg==true){
$('#formmodal').modal('hide')
sucess.innerHTML='user updated successfully'
$('#succeesmodal').modal('show')

Appendtotable(body)
}
else{
$('#formmodal').modal('hide')
failed.innerText='Unable to update user'
$('#failedmodal').modal('show')

}
})
.catch(res=>alert(res))
}
})}







function Deleteuser(id){

  const data={
      id:id
  }
fetch('/delete',{
 method:'DELETE',
 headers:{
  'content-Type':'application/json'
 },
 body:JSON.stringify(data)

})
.then(val=>val)
.then(msg=>msg)
.catch(msg=>alert(msg))
}
