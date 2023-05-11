const connectToMongo = require("./db");

connectToMongo()


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! i am here the best programmer in this world')
})

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})