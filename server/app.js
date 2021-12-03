const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const { API_KEY } = require("./config");

app.get("/topHeadlines/", (req, res) => {
  axios
    .get(`https://newsapi.org/v2/top-headlines/?country=us&apiKey=${API_KEY}`)
    .then((d) => {
      console.log(d.data.articles);
      res.status(200).send(d.data.articles.slice(0, 10));
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});
app.get("/sources/", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines/sources/?country=us&apiKey=${API_KEY}`
    )
    .then((sources) => {
      console.log(sources.data.sources.length);
      res.status(200).send(sources.data.sources);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});
app.get("/headlines/:query/", (req, res) => {
  console.log("hi");
  let { query } = req.params;
  query = query || "";

  axios
    .get(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${API_KEY}`)
    .then((d) => {
      console.log(d.data.articles);
      res.status(200).send(d.data.articles.slice(0, 10));
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});
app.get("/headlines/:sources/:category", (req, res) => {
  let { sources, category } = req.params;
  sources = sources || "";
  category = category || "";
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?sources=${sources}&category=${category}&apiKey=${API_KEY}`
    )
    .then((d) => {
      console.log(d.data.articles);
      res.status(200).send(d.data.articles.slice(0, 10));
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});

module.exports = app;
