const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const app = express()
const port = process.env.port || 8000;
app.get("/test", (req, res) =>{
    axios.get("https://www.pinterest.com/1redhouse/african-fashion/")
    .then(response =>{
        const html = response.data;
        const check = cheerio.load(html)
        console.log("testing this")
        const text = check(html).text();
        console.log(text)
        res.send(text)
    })
})
app.listen(port, () =>{
    console.log(`the port is running on this ${port}`)
})