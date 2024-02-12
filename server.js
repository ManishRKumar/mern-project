import express from 'express'
const app = express()
import { join } from 'path'
import {logger} from './middleware/logger'

const PORT = process.env.PORT || 3500

console.log(PORT,"PORT")

app.use(logger)
app.use('/',join(__dirname,'/public'))
app.use('/',require('./routes/root'))
app.all('*',(req,res) => {
     res.status(404)
     if(req.accepts('Html')){
        res.sendFile(join(__dirname,'views','404.html'))
     }else if(req.accepts('JSON')){
        res.json({message : 'page not found'})
     }else{
        res.type('text').send("404 error")
     }
})
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))