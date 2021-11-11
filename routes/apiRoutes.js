const router = require("express").Router();
let db = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

router.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "../db/db.json"))
})

router.post("/notes", (req, res)=>{
    
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4()
    }

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data)=>{
        const notesfromDB = JSON.parse(data);
       
        notesfromDB.push(newNote)
        
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesfromDB), (err)=>{
            if (err) throw err;
            console.log("Saved note to DB")
        })
    })
    res.sendFile(path.join(__dirname, "../db/db.json"));
})

router.delete("/notes/:id", (req, res)=>{
console.log("req.params.id", req.params.id)
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data)=>{
        const notesfromDB = JSON.parse(data);

        for(let i = 0; i < notesfromDB.length; i++){
            if(req.params.id === notesfromDB[i].id){
                notesfromDB.splice(i, 1)
            }
        }
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesfromDB), (err)=>{
            if (err) throw err;
            console.log("Deleted note from DB")
        })
        res.sendFile(path.join(__dirname, "../db/db.json"));
    })
})





module.exports = router;
