// condigure dependancies

const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const ejs = require('ejs');

app.use(express.json());
app.use(cors());
dotenv.config();

// connect to the database ***

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// check if the connection works

db.connect((err) =>{
    // no connection
    if(err)return console.log("Error connecting to the database");
    
    // connected to the database
    console.log("Connected successfuly to mysql db as id:", db.threadId)

    //GET METHOD EXAMPLE
    
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    //Data is the name of the file inside views folder
    app.get('/data', (req, res) =>{
        //retrieve data from database
        db.query('SELECT * FROM providers', (err, results) =>{
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else{
                // Display the records to the browser
                res.render('data', {results: results});
            }
        });
    });

    app.listen(process.env.PORT, () =>{
        console.log(`Server listening on port ${process.env.PORT}`);

        // send a message to the browser

        console.log('sending message to the browser...');
        app.get('/', (req, res) => {
            res.send('Server started successfully!! Smart aje buda!')
        })

    });
});