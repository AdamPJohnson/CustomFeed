const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const db = require("./db");
app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies
const User = require("./db/models/user");
app.use(cors());
const { API_KEY } = require("./config");

app.patch("/feeds", async (req, res) => {
  const { feedName, specs, userName } = req.body;
  const feed = { name: feedName, rules: specs };
  const query = User.find({ name: userName });
  query.exec((err, result) => {
    if (err) {
      throw err;
    }
    if (!result.length) {
      var user = new User({ name: userName, feeds: [feed] });
      user.save((err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      User.updateOne({ name: userName }, { $push: { feeds: feed } }).then((d) =>
        console.log(d)
      );
    }
  });
});

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

module.exports = app;
