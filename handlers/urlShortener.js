const dns = require('dns')
const URLSchema = require('../schema/shorturl')

let COUNTER = 0

const proccessURL = async (url) => {
   try {
     const existing = await URLSchema.find({original_url: url});
    if (existing.length > 1) {
        console.log("duplicates found")
        return { error: "Found duplicates"}
    };

    if (existing.length === 1) {
        return existing[0];
    }

    // Generate short url
    const short_url = COUNTER;

    const newURL = new URLSchema({
        original_url: url,
        short_url: short_url
    })

    newURL.save();

    COUNTER++;

    return newURL;
   } catch (err) {
    return { error: err.message || "Unknown error"}
   }
}


const URLShortenHandler =  (req, res, next) => {
    // Return immediately if no url is provided in the request body
    if (!req.body || !req.body.url || req.body.url === "") return res.json({
        error: "no url provided"
    })

    // Check if the url is a valid url
    dns.lookup(req.body.url , async (err) => {
        if (err) return res.json({
            error: "invalid url"
        })

        let result =  await proccessURL(req.body.url)

        console.log("Result: ", result)

        if (result.error) return res.json({
            error: result.error
        })
        
        return res.json({
            original_url: result.original_url,
            short_url: result.short_url
    })
})

}

module.exports = URLShortenHandler;