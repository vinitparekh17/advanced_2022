const { Router } = require('express');
const router = Router();
const { OAuth2Client } = require('google-auth-library');
let CLIENT_ID = `326946298299-es2nul9ejjg86ir6d06kauhch4pmjbqv.apps.googleusercontent.com`
const client = new OAuth2Client(CLIENT_ID);

router.get('/', (req, res) => {
    res.status(200).render('login')
})

router.post('/', (req, res) => {
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token,
                {
                    httpOnly: true,
                    maxAge: 900000
            })
            res.send("success")
        })
        .catch(console.error);
})

router.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/');
})
module.exports = router;