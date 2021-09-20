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
    dataarr = []
    let page_number = req.query['page']
    request(`https://www.gamulator.com/search.php?currentpage=${page_number}&search_term_string=${keyword}`).on('data',(data)=>{
       const $ = Cheerio.load(data);
       $('img.img-fluid').each(function(i){
           dataarr.push({
              img: 'https://www.gamulator.com'+$(this).attr('src')  ,
              title:$('h5.card-title').eq(i).text(),
              url:$('div.card > a').eq(i).attr('href'),
            })
       })
       res.send(dataarr);
    })
})

app.listen(PORT,()=>console.log(`listening at ${PORT}`))
