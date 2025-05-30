const dns = require('dns')

const URLShortenHandler = (req, res, next) => {
    console.log(req.body)

    // Return immediately if no url is provided in the request body
    if (!req.body || !req.body.url || req.body.url === "") return res.json({
        error: "no url provided"
    })

    // Check if the url is a valid url
    dns.lookup(req.body.url , { family: 0 }, (err, address, family) => {
        if (err) return res.json({
            error: "invalid url"
        })
        

    })

}

module.exports = URLShortenHandler;