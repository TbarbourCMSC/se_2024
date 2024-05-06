//manage interactios with sql service 
const mysql = require('mysql');
const dotenv = require('dotenv');
//const {result} = require('lodash');
let instance = null;
dotenv.config();

//connect to database 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log("This is the error: " + err.message)
    }
})

class Dbservice {
    static getDBserviceInstance() ///have only one instance of this
    {
        return instance ? instance : new Dbservice();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM games;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    //get all the entries for a game with it's ID
    async getData(id) 
    {
        try {
           
            id = parseInt(id, 10);
           
            const response = await new Promise((resolve, reject) => {

                //const query = "SELECT * FROM entry WHERE id = ?";
                const query = "SELECT * FROM entry WHERE games_id = ?"
                connection.query(query, [id], (err, result) => 
                {
                    if (err) reject(new Error(err.message));
                    //resolve(result.affectedRows);
                    resolve(result);
                    
                    
                   
                })
            });
            
            return response;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    //inset a new game into the table games
    async insertNewEntry(data) {
        console.log("insertNewEntry fired")
        try {
            //console.log(data);
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO games(game,date_added,description,score) VALUES (?,?,?,?)";

                connection.query(query, [data["game"], dateAdded, data["description"], data["score"]], (err, result) => {

                    if (err) reject(new Error(err.message));

                    resolve(result.insertId);


                })

            })

            return {
                id: insertId,
                game: data["game"],
                dataAdded: dateAdded,
                description: data["description"],
                score: data["score"]
            }


        } catch (error) {
            console.log(error)
        }
    }

    //inserts a new game's entries into the table "entries"
    async insertNewGameEntry(data) {
        console.log("insertNewGameEntry fired")
        try {
            //console.log(data);

            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO entry(entry_description,entry_score,games_id) VALUES (?,?,?)";

                connection.query(query, [data["entry_description"], data["entry_score"], data["games_id"]], (err, result) => {

                    if (err) reject(console.log(err));

                    resolve(result.insertId);


                })

            })

            return {
                id: insertId,
                entry_description: data["entry_description"],
                entry_score: data["entry_score"],
                games_id: data["games_id"]
            }


        } catch (error) {
            console.log(error)
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM games WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteEntryRowById(id) 
    {
        console.log(id)
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM entry WHERE entry_id = ?";

                connection.query(query, [id], (err, result) => 
                {
                    if (err) reject(console.log(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = Dbservice; // let this class be usable in other files 