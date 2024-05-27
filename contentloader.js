const cheerio = require("cheerio")
const axios = require("axios")
function webLoader(url) {
    axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        $("a").each( function(){
            const source =  $(this).attr("scr");
            return source;
        })
    })
}
module.exports = {
    SourceLoader: webLoader(),
}