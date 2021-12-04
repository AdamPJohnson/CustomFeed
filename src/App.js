import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Headlines from "./Headlines";
import MyFeeds from "./MyFeeds";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const userName = "Adam";

function App() {
  const [headlines, setHeadlines] = useState([]);
  const [user, setUser] = useState({
    name: "Adam",
    zip: 94606,
    feeds: [],
  });
  const [page, setPage] = useState("home");
  const [currentFeed, setCurrentFeed] = useState({});
  const firstRender = useRef(true);

  const fetchFeed = (feed) => {
    return axios.get(`http://localhost:3000/customFeed/`, { params: { feed } });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/topHeadlines/`)
      .then((headlines) => {
        setHeadlines(headlines.data);
      })
      .catch((e) => console.log(e));

    axios
      .get(`http://localhost:3000/users/${userName}`)
      .then((d) => {
        setUser(d.data[0]);
      })
      .catch((error) => console.log({ error }));
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      console.log(currentFeed);
      fetchFeed(currentFeed)
        .then((headlines) => {
          setHeadlines([headlines.data]);
        })
        .catch((e) => console.log(e));
    } else {
      firstRender.current = false;
    }
  }, [currentFeed]);

  return (
    <>
      <Header setPage={setPage} user={user} />
      {page === "home" && (
        <div id="mainContainer">
          <Headlines
            headlines={headlines}
            user={user}
            setCurrentFeed={setCurrentFeed}
            currentFeed={currentFeed}
          />
        </div>
      )}
      {page === "myfeeds" && (
        <div id="mainContainer">
          <MyFeeds user={user} setUser={setUser} />
        </div>
      )}
    </>
  );
}

export default App;
