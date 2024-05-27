const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const  app = express();
const fakepage = require("./fakedata");
let Keywords = require("./keywords")
Keywords = Keywords.Keywords;
const cxcode = "d4a24b48c2b964e64";
const pages = " 10";
const API_KEY = "AIzaSyARlU6D3gFMnH80BTLyT9A-OetyixEylWY";
const port = process.env.port || 5000;
/*
*** comment
This part is where the  the link from the searched keyword is extracted and stored in json
***
*/
let extracted_links = []
function retriverLinks(dataset){
    const linksindx = []
    dataset.map((items) => {
        const  itL = items["items"];
        itL.map(items =>{
            // console.log((items))
           linksindx.push({
            url: items.link,
            title: items.title,
            desc: items.snippet
        });
        })
        // console.log(linksindx)
    })
    return linksindx; 
}
function getRes(find){
    axios.get(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cxcode}&q=${find}`,{ method: "GET" })
    .then(response => {
        const rdata = [response.data];
        try{
            const ldata = retriverLinks(rdata);
            extracted_links = [...extracted_links, ...ldata]
             }
         finally {
             console.log("it loaded well, my friend!");
         }
   })
}
function getGlobalData(){
    var i = 0;
    while(i < Keywords.length){
        console.log(Keywords[i])
        getRes(Keywords[i])
        i++;
    }
}

app.get("/", (req, res)=>{
getGlobalData();
})

app.listen(port, () => {
    console.log(`the port is running on the port ${port}`)
})