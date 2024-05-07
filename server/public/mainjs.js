
//DO NOT LOOK INTO HERE IF USING VSCODE JUST LEAVE IT COMPRESSED






//create an object to handle game entries from table 
var LASTFILENAME = "";
class gameObject
{
    constructor(id = 0,game = '',picture = '',description = '',score = 0)
    {
        this.id = id;
        this.game = game;
        this.picture = picture;
        this.description = description;
        this.score = score;
    }

   getId() {return this.id;}
   getGame() {return this.game;}
   getPicture() {return this.picture;}
   getDescription() {return this.description;}
   getScore() {return this.score;}
}

//create an object for the entries 
class entryObject
{
    constructor(entryId = 0,entryDescription = '',entryScore = '',gamesId = 0)
    {
        this.entryId = entryId;
        this.entryDescription = entryDescription;
        this.entryScore = entryScore;
        this.gamesId = gamesId;

    }

    getEntryId() {return this.entryId;}
    getEntryDescription() {return this.entryDescription;}
    getEntryScore() {return this.entryScore;}
    getGamesId() {return this.gamesId;}
}




let gameObjectList = [];
let entryObjectList = [];



/*Get all the game data from the backend, then display it as the homepage*/
document.addEventListener('DOMContentLoaded', function() 
{
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    //.then(data => setGameLinkedList(data['data']))
    //.then(function(response){console.log(response.data)})
    .then(function(response)
    {
        for(item in response.data)
        {
            //console.log(response.data[item]['id'])
            let temp = new gameObject((response.data[item]['id']),
                                      response.data[item]['game'],
                                      response.data[item]['picture'],
                                      response.data[item]['description'],
                                      response.data[item]['score']);
            gameObjectList.push(temp)
          
        }
    })
    .then(function ()
    {
        const attatchpoint = document.getElementById("attatch-point"); //all elements will be attatched here
        
        //create the html here for the page
        
        for(let i = 0; i < gameObjectList.length;i++)
        {
            console.log(gameObjectList[i])
            const mainDiv = document.createElement("div");
            mainDiv.classList.add("game-obj-div");
            mainDiv.setAttribute("id", "game-obj-id");

        
            //main title
            const gameTitle =  document.createElement("h2");
            gameTitle.classList.add("game-obj-title");
            gameTitle.setAttribute("id", "game-obj-title");
            gameTitle.innerHTML = gameObjectList[i].getGame()

            mainDiv.appendChild(gameTitle);

            //picture
            const gamePicture = document.createElement("img");
            gamePicture.setAttribute("src", "assets/"+ gameObjectList[i].getPicture());
            gamePicture.setAttribute("width", "200");
            gamePicture.setAttribute("height", "200");
            console.log(gameObjectList[i].getPicture())

            mainDiv.appendChild(gamePicture);
            //description
            const gameDescription =  document.createElement("h3");
            gameDescription.setAttribute("id", "game-obj-desc");
            gameDescription.innerText = "This is a test";
            gameDescription.innerHTML = gameObjectList[i].getDescription()

            mainDiv.appendChild(gameDescription);

            //score 
            const gameScore = document.createElement("h2");
            gameScore.setAttribute("id", "game-obj-score");
            gameScore.classList.add("game-obj-score");
            gameScore.innerHTML = "Score: " + gameObjectList[i].getScore();

            mainDiv.appendChild(gameScore);


            //delete button
            const deleteBtn = document.createElement("h2");
            deleteBtn.setAttribute("id", "game-obj-deletebtn");
            deleteBtn.classList.add("game-obj-deletebtn");
            deleteBtn.innerHTML = "DELETE"

            mainDiv.appendChild(deleteBtn);

            //edit button
            const editBtn = document.createElement("h2");
            editBtn.setAttribute("id", "game-obj-editbtn");
            editBtn.classList.add("game-obj-editbtn");
            editBtn.innerHTML = "EDIT"

            mainDiv.appendChild(editBtn);

            attatchpoint.appendChild(mainDiv);

        }
     
    })
    //build the forms for submission -- now static
   /* .then(function () 
    {
        const attatchpoint = document.getElementById("form-attatch-point");

        let form = document.createElement("form");
   
        
        //input element
        let input = document.createElement("input");
        input.setAttribute('type',"text");
        input.setAttribute('title','title');
        input.setAttribute("id","title")

        let secondInput = document.createElement("input");
        secondInput.setAttribute('type',"text");
        secondInput.setAttribute('description','desc');
        secondInput.setAttribute('id','snippet')
        
        

        let submit = document.createElement("h1"); //input element, Submit button
        submit.setAttribute('id','submit-btn')
        submit.innerHTML = "Submit"
        

        form.appendChild(input);
        form.appendChild(secondInput);
        form.appendChild(submit);

        attatchpoint.appendChild(form)

    })*/
    
    
});

//global event listeners

document.addEventListener('click',function(event)
{
    
    if(event.target.id ==='game-obj-title')
    {

        console.log(event.target.innerHTML);
        id = returnid(event.target.innerHTML);
        loadEntries(id);
    }

    /*else if(event.target.id ==='submit-btn') Deprecated
    {
        submitBtn();
    }*/

    else if(event.target.id === 'game-obj-deletebtn')
    {
        let id = returnid(event.target.parentNode.childNodes[0].innerHTML)
        deleteRowById(id);
    }

    //pulls up edit for,
    else if(event.target.id === "game-obj-editbtn")
    {
        let id = returnid(event.target.parentNode.childNodes[0].innerHTML)
        editRowById(id);
    } 

    //for the button to close form
    else if (event.target.id === "edit-cancel-btn"){
        document.getElementById("myForm").style.display = "none";
    }

    else if(event.target.id === "create-cancel-btn"){
        document.getElementById("createForm").style.display = "none";
    }

    //for the submit button
    else if(event.target.id === "edit-update-btn"){
        console.log(document.querySelector("#edit-update-btn").dataset.id);
        updateGame();
    }

    else if(event.target.id === "show-create-btn")
    {
        console.log("SHOW THE FORM!");
        showCreateForm();
    }
    
    else if(event.target.id === "create-btn")
    {
        console.log("CREATING!");
        submitBtn();
    }

    else if(event.target.id ==- 'home-btn')
    {
        
        
    }
    
});
function returnid(name)
{
    for(let i = 0; i < gameObjectList.length;i++)
    {
        if(name === gameObjectList[i]['game'])
        {
            return gameObjectList[i]['id'];
        }
    }
    
}

function deleteRowById(id)
{
    fetch('http://localhost:3000/delete/' + id, 
    {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
   
}

//displays edit screen
function editRowById(id)
{
    console.log("Setting selection to: " + id);
    document.getElementById("myForm").style.display = "block";
    document.querySelector("#edit-update-btn").dataset.id=id;
    console.log("Set the edit-update-btn to: " + document.querySelector("#edit-update-btn").dataset.id);
}

//updates it in sql
function updateGame()
{
    console.log("Updating");
    const idInput = document.querySelector("#edit-update-btn").dataset.id;
    const scoreInput = document.querySelector("#edit-score");
    const descInput = document.querySelector("#edit-description");

    const id = idInput;
    const score = scoreInput.value;
    const desc = descInput.value;

    console.log("ID: " + id);
    console.log("Score: " + score);
    console.log("Desc: " + desc);

    if(id == "" || score == "" || desc == ""){
        alert("Enter a valid input (populate all fields)");
    } else {
    
    

    fetch("updateGame", {
        headers : {
            "Content-type" : "application/json"
        },
        method : "PATCH",
        body: JSON.stringify({
            id: id,
            desc: desc,
            score: score
        })
    }) 
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
            console.log("SUCCESS");
        } else{
            console.log("FAILED");
        }
    });
}

}


function loadEntries(id)
{
    
    let call = "http://localhost:3000/getAllGame/"+id;
    fetch(call)
    .then(response => response.json())
    .then(function (response)
    {
        
        for(item in response.data)
        {
            //console.log(response.data[item]['id'])
            let temp = new entryObject((response.data[item]['entry_id']),
                                      response.data[item]['entry_description'],
                                      response.data[item]["picture"],
                                      response.data[item]['entry_score'],
                                      response.data[item]['games_id']);
                           
            entryObjectList.push(temp)
          
        }
    })
    .then(function () 
    {
        console.log(entryObjectList);
        //clear the children of all the previous attatchments 
        const mainAttatch = document.getElementById("attatch-point");
       
        const formAttatch = document.getElementById("form-attatch-point");
        
        mainAttatch.innerHTML = '';
        formAttatch.innerHTML = '';

        const entryAttatch = document.getElementById("entry-attatch-point");
        for(let i = 0; i < entryObjectList.length;i++)
        {
            const entry = document.createElement("p");
            entry.innerHTML = entryObjectList[i].getEntryDescription();

            entryAttatch.appendChild(entry);

          

        }

          //create back button
          const back = document.createElement("h2");
          back.setAttribute("id","home-btn");
          back.innerHTML = "HOME";
          entryAttatch.appendChild(back);
    });
    
}
function submitBtn()
{
    console.log("clicked button");
    //get the input fields and clear them
    const gameTitleField = document.getElementById("create-name")
    const gameDescriptionField = document.getElementById("create-description")
    const gameScoreField = document.getElementById("create-score")
    const test = document.getElementById("picture-form")

    console.log(gameTitleField.value)
    console.log(gameDescriptionField.value)
    console.log(gameScoreField.value)
    console.log(LASTFILENAME)


    //get the values of the fields before deletion
    const title = gameTitleField.value
    const description = gameDescriptionField.value
    const score = gameScoreField.value;
    const picture = LASTFILENAME;

    gameTitleField.value = "";
    gameDescriptionField.value = "";
    
    if(title == "" || score == "" || description == "" || picture == ""){
        alert("Enter a valid input (populate all fields)");
    } else {
    
    //pass a manual fetch to the backend 
    fetch('/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ game : title, description: description,score: score, picture: picture})
    })
    .then(response => response.json())
    .then(function()
    {
        location.reload();
        return false;
    })
    LASTFILENAME = "";
}

   
   

}
function testResponse(data)
{
   
    //create some nodes and a DLL
    let testNode1 = new Node("ahh");
    let testNode2 = new Node("meee");

}

function setGameLinkedList(data)
{
    //create a game object for every incoming item
    for(item in data)
    {
        let temp = new gameObject(data[item]['id'],data[item]['game'],data[item]['picture'],data[item]['description'],data[item]['score']);
        gameObjectList.append(temp)
    }
    return gameObjectList;
}


function createGamePage(data)
{
    console.log(data)
}


function showCreateForm(){
    document.getElementById("createForm").style.display = "block"; 
}

/* THis shit below is for login stuff *./
//Pseudo Code
/*
On button click (register)
show register form
on click register
save entries {username, password} to the server
*/
/*
on buttohn click(login)
show login form
on click login
take and compare entries from login form to all on sql server
if user & password are found then logn
else 
promt again
*/

function updateName(){
    var name = document.getElementById('file');
    console.log(name.files.item(0).name);
    LASTFILENAME = name.files.item(0).name;
}