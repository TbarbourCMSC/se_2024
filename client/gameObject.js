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

module.exports = gameObject;