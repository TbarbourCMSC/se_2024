
//DO NOT LOOK INTO HERE IF USING VSCODE JUST LEAVE IT COMPRESSED






//create an object to handle game entries from table 
class gameObject
{
    constructor(id = 0,game = '',dateAdded = '',description = '',score = 0)
    {
        this.id = id;
        this.game = game;
        this.dateAdded = dateAdded;
        this.description = description;
        this.score = score;
    }

   getId() {return this.id;}
   getGame() {return this.game;}
   getDateAdded() {return this.dateAdded;}
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
                                      response.data[item]['date_added'],
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
            //description
            const gameDescription =  document.createElement("h2");
            gameDescription.setAttribute("id", "game-obj-desc");
            gameDescription.classList.add("game-obj-desc");
            gameDescription.innerHTML = gameObjectList[i].getDescription()

            mainDiv.appendChild(gameDescription);

            //score 
            const gameScore =  document.createElement("h2");
            gameScore.setAttribute("id", "game-obj-score");
            gameScore.classList.add("game-obj-score");
            gameScore.innerHTML = gameObjectList[i].getScore();

            mainDiv.appendChild(gameScore);

            //delete button
            const deleteBtn = document.createElement("h2");
            deleteBtn.setAttribute("id", "game-obj-deletebtn");
            deleteBtn.classList.add("game-obj-deletebtn");
            deleteBtn.innerHTML = "DELETE"

            mainDiv.appendChild(deleteBtn);


            attatchpoint.appendChild(mainDiv);

        }
    
    })
    //build the forms for submission
    .then(function ()
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

    })
    
    
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

    else if(event.target.id ==='submit-btn')
    {
        submitBtn();
    }

    else if(event.target.id === 'game-obj-deletebtn')
    {
        let id = returnid(event.target.parentNode.childNodes[0].innerHTML)
        deleteRowById(id);
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
    const gameTitleField = document.getElementById("title")
    const GameDescriptionField = document.getElementById("snippet")
  
    //get the values of the fields before deletion
    const title = gameTitleField.value
    const description = GameDescriptionField.value
    const score = 0;

    gameTitleField.value = "";
    GameDescriptionField.value = "";
    
    
    //pass a manual fetch to the backend 
    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ game : title, description: description,score: score})
    })
    .then(response => response.json())
    .then(function()
    {
        location.reload();
        return false;
    })

   
   

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
        let temp = new gameObject(data[item]['id'],data[item]['game'],data[item]['date_added'],data[item]['description'],data[item]['score']);
        gameObjectList.append(temp)
    }
    return gameObjectList;
}


function createGamePage(data)
{
    
    console.log(data)
}

