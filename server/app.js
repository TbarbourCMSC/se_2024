/*
TOOLS USED 
Xampp (sql databae manager)
NodeJS
Express
Ejs
loadash 
nodemon 
mysql
env (store config information like passwords and username)
cors (api calls from front end to back end)
*/

const express = require('express'); 
const app = express(); //instantialize app
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbservice = require('./dbservice'); //db service file
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static('public'));
/*

*/
app.listen(process.env.PORT,() => console.log("app started"))

//read 
app.get('/getAll', (request, response) => {
    const db = dbservice.getDBserviceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
//get all game entries with a id (confusing name but hey)
app.get('/getAllGame/:id', (request, response) => {
    

    paramId = request.params.id
    const db = dbservice.getDBserviceInstance();
    const result = db.getData(paramId);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

})
app.post('/insert', (request, response) => 
{
    const {game, description, score} = request.body;
    const db = dbservice.getDBserviceInstance();
    const result  = db.insertNewEntry({game,description,score})

    result
    .then(data => response.json({data: data}))
    //.then(err => console.log(err.message))

});
//get a game and it's entries (DON'T USE)
app.get('/games/:id',(request,response)=>
{

    const id = request.params.id;
    const db = dbservice.getDBserviceInstance();

    console.log(id);
    //console.log(result) 
})
//add an entey to a game
app.post('/insert/:id', (request, response) => 
{
    
    const {entry_description, entry_score, games_id} = request.body;
    console.log(entry_description,entry_score,games_id);

    const db = dbservice.getDBserviceInstance();
    const result  = db.insertNewGameEntry( {entry_description, entry_score, games_id})
    result
    .then(data => response.json({data: data}))
    //.then(err => console.log(err.message))
    
});
// delete game 
app.delete('/delete/:id', (request, response) => 
{
    console.log("Deleting Game.");
    const { id } = request.params;
    const db = dbservice.getDBserviceInstance()

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete entry 
app.delete('/deleteEntry/:id', (request, response) => 
{
    console.log("Deleting Entry");
    const { id } = request.params;
    const db = dbservice.getDBserviceInstance()
    const result = db.deleteEntryRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

//edit Game
app.patch("/updateGame", (req,res) =>{
    console.log("Updating Game");
    const {id, desc, score} = req.body;
    console.log(req.body);
    const db = dbservice.getDBserviceInstance();
    const result = db.updateGame(id, desc, score);
    result.then(data => res.json({success: true})).catch(err => console.log(err));
});