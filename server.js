const express = require("express")
const env = require("dotenv").config()
const bodyparser = require("body-parser")
const app = express()
const mysql = require("mysql")
const jwt = require("jsonwebtoken")
const secret_key = process.env.SECRET_KEY
app.use(bodyparser.json())
const knex = require("knex")({
    client : "mysql",
    connection:{
        host : process.env.HOST,
        user : process.env.USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DB_NAME
    }
})



app.use(table=express.Router())
require('./create_table')(knex)

app.use("/blog",login_signup=express.Router())
require("./login_signup")(login_signup,knex,jwt,secret_key)

app.use("/blog",post=express.Router())
require("./post")(post,knex,jwt,secret_key)

app.use("/blog",like_dislike=express.Router())
require("./like_dislike")(like_dislike,knex,jwt,secret_key)



app.listen(process.env.PORT,()=>{
    console.log(`server is listning on port ${process.env.PORT}`)
})