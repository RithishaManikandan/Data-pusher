const express = require('express')
const app = express()
const mongoose=require('mongoose')
const bodyparser = require('body-parser')
const router = require('../src/router/route')

app.use(bodyparser.json())

mongoose.connect('mongodb+srv://popinzs007:Reethu007@cluster0.xyrrffh.mongodb.net/pappuma')
.then(()=>{
    console.log('Mongoose got connected')
})
.catch(err=>{
    console.log(err)
})

app.use('/',router)

app.listen(3000,()=>{

    console.log('Port connected to 3000')
})

