const express = require('express')
const axios = require('axios')
const app = express()

app.get('/*', (req, res) => {
    if (!req.query.user || !req.query.repo || !req.query.path) {
        res.status(400).send('Error: Missing parameters (user, repo, path)')
        return
    }
    axios.get(`https://github.com/${req.query.user}/${req.query.repo}/raw/${req.query.branch || 'main'}/${req.query.path}`)
        .then(response => {
            console.log(response.headers)
            res.header('Content-Type', response.headers['content-type']).send(response.data)
        })
        .catch(error => {
            res.status(400).send(`API Error!`)
        })
})

app.listen(5210)

module.exports = app
