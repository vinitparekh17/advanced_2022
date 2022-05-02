const { Router } = require('express');
const router = Router();
const checkAuth = require('../checkAuth');

router.get("/animepanel", checkAuth, (req, res) => {
    var user = req.user
    res.render('anime', { imageUrl: null, user, NavTitle: 'Anime' })
})

router.post("/animepanel", checkAuth, (req, res) => {
    var user = req.user
    const option = req.body.option;
    try {
        const { get } = require("https");
        let data;
        var url = `https://neko-love.xyz/api/v1/${option}`;
        get(url, (response) => {
            const { statusCode } = res;
            if (statusCode != 200) {
                response.resume;
            }
            response.setEncoding("utf8");
            let rawData = '';
            response.on("data", (chunk) => {
                rawData += chunk;
            });
            response.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    res.render('anime', {
                        NavTitle: 'Anime',
                        imageUrl: parsedData.url,
                        user
                    })
                } catch (e) {
                    console.log(e);
                }
            })
        })
    } catch (e) {
        return console.log(e);
    }
})

module.exports = router;