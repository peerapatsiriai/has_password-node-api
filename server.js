const express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const bcrypt = require('bcrypt')
const db = require('./con_db')
const res = require('express/lib/response')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/",(req, res) => {
    res.send("EZ")
})

app.post("/register",(req,res) => {
    const {email, password} = req.body
    bcrypt.hash(password,10).then(result => {
        db.query("INSERT INTO `password` (`email`,`password`) VALUES (?,?);",[email,result])
        res.status(200).send('good')
    }) 
})

app.post('/login',(req, res) => {
    const {email, password} = req.body
    db.execute("SELECT * FROM `password` WHERE email = ?",[email]).then(([result]) =>{
        if(result.length > 0){
            bcrypt.compare(password,result[0].password).then(result =>{
                if(result) {
                    res.status(200).send('Login')
                }else{
                    res.status(404).send('Pass wrong')
                }
            })
        }else{
            res.status(404).send('notfound')
        }
    })
})

app.listen(3000,() => {
    console.log("app run 3000..");
})