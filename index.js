const express = require("express");
const cors = require("cors");
const request = require("requests");
const app = express();
const Cheerio = require("cheerio");
app.use(cors());
const PORT = process.env.PORT || 8080;
let dataarr = [];

app.use(express.json())

app.get("/api/search",(req,res)=>{
    let keyword = req.query['q'];
    request('https://coolrom.com.au/search?q='+keyword).on('data',(data)=>{
        const $ = Cheerio.load(data);
        $('a').each((i)=>{
            dataarr.push($(this).text())
        })
        res.send(dataarr)
    })
})

app.listen(PORT,()=>console.log(`listening at ${PORT}`))
