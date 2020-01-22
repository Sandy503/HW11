// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT ||  3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Routes
// =============================================================

// Routes to html pages
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET route
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// POST route
app.post("/api/notes", function(req, res) {
    let noteArr = []
    const savedNotes = fs.readFileSync("./db/db.json");
    noteArr.push(savedNotes);

    const newNote = {
        title: req.body.title,
        text: req.body.text
    };
    fs.writeFile("./db/db.json", JSON.stringify(newNote), () => {
        console.log(req.body.title + " added to note DataBase");
      });
    res.json(newNote);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });