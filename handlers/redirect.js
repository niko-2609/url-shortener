const URLSchema = require('../schema/shorturl')

const RedirectHandler = async(req, res, next) => {
    try {
    const shorturlVar = parseInt(req.params.shorturl)
   let existing = await URLSchema.find({
    short_url: shorturlVar
   })

    if (existing.length > 1) {
        return { error: "Found duplicates, unable to redirect"}
    }

    console.log(existing)

    if (existing.length === 1) {
        return res.redirect(existing[0].original_url)
    }


    return res.json({
        error: "No url found for the given input"
    })
    } catch(err) {
        return res.json({
            error: "Unknown error"
        })
    }   

}


module.exports = RedirectHandler;