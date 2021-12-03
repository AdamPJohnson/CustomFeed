import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import TopHeadlines from "./Topheadlines";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

function App() {
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [page, setPage] = useState("top");
  const query = "trump";
  const sources = "bbc-news";
  const category = "covid";
  useEffect(() => {
    axios
      .get(`http://localhost:3000/topHeadlines/`)
      .then((headlines) => {
        setTopHeadlines(headlines.data);
        console.log(headlines.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header />
      {page === "top" && (
        <div id="mainContainer">
          <TopHeadlines headlines={topHeadlines} />
        </div>
      )}
    </>
  );
}

export default App;
