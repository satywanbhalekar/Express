const express = require('express')
require("../src/db/conn")
const router = require('./routers/men');
const app = express()
const port = 30001

app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})