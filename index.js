import axios from "axios";
import express from "express";


const  app = express();
import {FakeData} from "./fakedata.js";
import {KEYWORDS} from "./keywords.js";
/* 
Engine id/codes >>--------!>

278114db3f7e34d2b
d4a24b48c2b964e64

*/

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

app.get("/", (req, res)=>{
    res.json({
        "message": "App is running",
        "status": 200
    }).status(200);

    for(let keyword of KEYWORDS){

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
})

app.listen(port, () => {
    console.log(`the port is running on the port ${port}`)
})