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
  console.log(specs);
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
      User.findOneAndUpdate(
        { name: userName },
        { $push: { feeds: feed } },
        { new: true }
      )
        .then((d) => {
          res.status(201).send(d);
        })
        .catch((e) => {
          console.log(e);
          res.status(409).send();
        });
    }
  });
});
app.patch("/feeds/:feedName/:userName", async (req, res) => {
  const { feedName, userName } = req.params;

  User.updateOne(
    { name: userName },
    {
      $pull: { feeds: { name: feedName } },
    }
  )
    .then((d) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log({ e });
      res.status(400).send();
    });
});

app.get("/feeds", async (req, res) => {
  const { userName } = req.body;
  User.find({ name: userName }).then((user) => console.log(user));
});

app.get("/customFeed", (req, res) => {
  const rules = JSON.parse(req.query.feed).rules;

  Promise.all(
    rules.map((rule) => {
      const { source, category } = rule;
      return axios
        .get(
          `https://newsapi.org/v2/top-headlines/?country=us&category=${category}&apiKey=${API_KEY}`
        )
        .then((headline) => {
          let { articles } = headline.data;
          articles = articles.filter((article) => (article.source.id = source));
          return articles;
        })
        .catch((e) => {
          console.log(e);
          return [];
        });
    })
  )
    .then((resultArray) => {
      let headlines = resultArray.flat();
      console.log(headlines);

      headlines = headlines.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      res.status(200).send(headlines);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});
app.get("/users/:userName", async (req, res) => {
  const { userName } = req.params;

  User.find({ name: userName })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get("/topHeadlines/", (req, res) => {
  axios
    .get(`https://newsapi.org/v2/top-headlines/?country=us&apiKey=${API_KEY}`)
    .then((d) => {
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

module.exports = app;
