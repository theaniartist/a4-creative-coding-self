///https://wallpapercave.com/wp/wp3855232.png

const express = require('express'),
      app = express(),
      cors = require('cors')

app.use(express.static('public'))
app.use(cors())

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
  });

app.listen(3000)