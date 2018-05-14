// Build your first crud app! Using what we learned yesterday create a full crud app for user objects. The objects should look like this:
// {
//   "name":"user name",
//   "email": "user email",
//   "state": "CA"
// }


// Here's a list of all the routes you'll need.
//  - Create route for creating new users
//  - Get route for getting all users
//  - Get route for getting a user by name
//  - Update route for updating a user by name
//  - Delete route for deleting a user by name

const express = require('express');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//  - Create route for creating new user
// app.post('/users', (req, res)=> {
// let user = req.body;
// let newUser=fs.readFileSync('./storage.json','utf8')
// let currArr=JSON.parse(newUser)
// currArr.push(user)
// fs.writeFileSync('./storage.json', JSON.stringify(currArr))
// res.json(user)
// });
// //  - Get route for getting all users
// app.get('/users',(req,res)=>{
//   let data = fs.readFileSync('./storage.json', 'utf8')
//   let currArr=JSON.parse(data)
//   res.json(currArr)
// })
// //  - Get route for getting a user by name
// app.get('/users/:name', (req,res)=>{
// let userData=fs.readFileSync('./storage.json', 'utf8')
// let currData=JSON.parse(userData)
// for(let i=0;i<currData.length;i++){
// if(currData[i].name==req.params.name){
// res.json(currData[i]);
// return;
// }
// }
// res.sendStatus(404)
// })
//  // - Update route for updating a user by name
// app.patch('/users/:name', (req,res)=>{
//   const user = req.body;
//   let userContent=fs.readFileSync('./storage.json','utf8')
//   let currContent=JSON.parse(userContent)
//   for(let i=0;i<currContent.length;i++){
//   if(currContent[i].name==req.params.name){
//     // first update currContent with new data
//     currContent[i] = {
//       ...currContent[i],
//       ...user
//     }
//     fs.writeFileSync('./storage.json', JSON.stringify(currContent))
//     res.json(currContent[i]);
//     return;
//   }
//   }
//   res.sendStatus(400)
//   })
//
// //  - Delete route for deleting a user by name
// app.delete('/users/:name', (req,res)=>{
//   let userContent=fs.readFileSync('./storage.json','utf8')
//   let currContent=JSON.parse(userContent)
//   for(let i=0;i<currContent.length;i++){
//   if(currContent[i].name==req.params.name){
//     currContent.splice(i, 1)
//     fs.writeFileSync('./storage.json', JSON.stringify(currContent))
//     res.json("successfully deleted user");
//     }
//   }
// })
// ### Stretch:
// Add an id field to the object and use that instead of name for all of your routes.

//  - Create route for creating new user
app.post('/users', (req, res)=> {
let user = req.body;
user.id = new Date().getTime();
let newUser=fs.readFileSync('./storage.json','utf8')
let currArr=JSON.parse(newUser)
currArr.push(user)
fs.writeFileSync('./storage.json', JSON.stringify(currArr))
res.json(user)
});
//  - Get route for getting all users
app.get('/users',(req,res)=>{
  let data = fs.readFileSync('./storage.json', 'utf8')
  let currArr=JSON.parse(data)
  res.json(currArr)
})
//  - Get route for getting a user by id
app.get('/users/:id', (req,res)=>{
let userData=fs.readFileSync('./storage.json', 'utf8')
let currData=JSON.parse(userData)
for(let i=0;i<currData.length;i++){
if(currData[i].id==req.params.id){
res.json(currData[i]);
return;
}
}
res.sendStatus(404)
})
 // - Update route for updating a user by id
app.patch('/users/:id', (req,res)=>{
  const user = req.body;
  let userContent=fs.readFileSync('./storage.json','utf8')
  let currContent=JSON.parse(userContent)
  for(let i=0;i<currContent.length;i++){
  if(currContent[i].id==req.params.id){
    // first update currContent with new data
    currContent[i] = {
      ...currContent[i],
      ...user
    }
    fs.writeFileSync('./storage.json', JSON.stringify(currContent))
    res.json(currContent[i]);
    return;
  }
  }
  res.sendStatus(400)
  })

//  - Delete route for deleting a user by id
app.delete('/users/:id', (req,res)=>{
  let userContent=fs.readFileSync('./storage.json','utf8')
  let currContent=JSON.parse(userContent)
  for(let i=0;i<currContent.length;i++){
  if(currContent[i].id==req.params.id){
    currContent.splice(i, 1)
    fs.writeFileSync('./storage.json', JSON.stringify(currContent))
    res.json("successfully deleted user");
    }
  }
})

app.use(function(req, res) {
    res.sendStatus(404);
  });

app.listen(port, function() {
    console.log('Listening on port', port);
  });
