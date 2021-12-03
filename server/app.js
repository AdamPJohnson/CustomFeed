const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const { API_KEY } = require("./config");

app.get("/headlines/:query", (req, res) => {
  console.log("hi");
  axios
    .get(
      `https://newsapi.org/v2/everything?q=Apple&from=2021-12-03&sortBy=popularity&apiKey=${API_KEY}`
    )

    .then((d) => console.log(d.data.articles.slice(0, 10)));
});

module.exports = app;
