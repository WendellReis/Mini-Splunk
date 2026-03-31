const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/logs', (req, res) => {
  console.log(req.body)

  res.json({
    message: 'Ok',
    dados: req.body
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
