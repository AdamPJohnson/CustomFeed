import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Headlines from "./Headlines";
import MyFeeds from "./MyFeeds";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const currentUser = {
  name: "Adam",
  zip: 94606,
  feeds: [
    { name: "Feed1", rules: [{ source: "bbc-news", category: "business" }] },
    {
      name: "Feed2",
      rules: [
        { source: "reuters", category: "health" },
        { source: "reuters", category: "business" },
        { source: "bbc-news", category: "science" },
      ],
    },
    { name: "Feed3", rules: [] },
  ],
};

function App() {
  const [headlines, setHeadlines] = useState([]);
  const [page, setPage] = useState("top");
  const [currentFeed, setCurrentFeed] = useState({});
  const firstRender = useRef(true);
  const query = "trump";
  const sources = "bbc-news";
  const category = "covid";
  useEffect(() => {
    axios
      .get(`http://localhost:3000/topHeadlines/`)
      .then((headlines) => {
        setHeadlines(headlines.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      fetchFeed(currentFeed)
        .then((headlines) => {
          setHeadlines([headlines.data]);
        })
        .catch((e) => console.log(e));
    }
  }, [currentFeed]);

  const fetchFeed = (feed) => {
    return axios.get(`http://localhost:3000/customFeed`, { feed });
  };
  return (
    <>
      <Header setPage={setPage} user={currentUser} />
      {page === "top" && (
        <div id="mainContainer">
          <Headlines headlines={headlines} user={currentUser} />
        </div>
      )}
      {page === "myfeeds" && (
        <div id="mainContainer">
          <MyFeeds user={currentUser} />
        </div>
      )}
    </>
  );
}

export default App;
