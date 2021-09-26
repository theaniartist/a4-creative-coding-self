///https://wallpapercave.com/wp/wp3855232.png

const express = require("express");
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.listen(3000)