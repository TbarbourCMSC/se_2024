

let gameObjectList = [] //this is such a bad datascrut to use find a better one later 
let entryObjectList = [] // this one too figure it out later 

document.addEventListener('DOMContentLoaded', function() 
{
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => testResponse(data['data']))
});

function testResponse(data)
{
    console.log(data);
    gameObject = gameObject();
}

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
