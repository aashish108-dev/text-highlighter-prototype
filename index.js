const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.render('start', { title: 'Eigen Tech Test', message: 'Hello there!' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



