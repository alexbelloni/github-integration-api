module.exports = (app) => {
    app.post('/getaccess', (req, res) => {
        /**
         * get access_token from GitHub API 
         * 
         * input:
         * body { code: string }
         * 
         * .env GitHub API's CLIENT_ID and CLIENT_SECRET
         * 
         * output:
         * { access_token: string, succeeded: boolean }
         */
        const { code } = req.body

        const data = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code
        }

        const fetch = require('node-fetch');

        fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(response => response.text())
            .then(response => {
                try {
                    console.log('succeeded',response);
                    res.json({ access_token: response.split("&")[0].split("=")[1], succeeded: true });
                } catch (e) {
                    console.error('failed',err);
                    res.json({});
                }
            })
            .catch(err => {
                console.error('failed',err);
                res.json({});
            });
    });
}