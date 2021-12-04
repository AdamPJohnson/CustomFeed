import React, { useState, useEffect } from "react";
import AddFeed from "./AddFeed";
import FeedListItem from "./FeedListItem";
import FeedDetail from "./FeedDetail";
import axios from "axios";
function MyFeeds({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [detailFeed, setDetailFeed] = useState(null);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/sources")
      .then((sources) => setSources(sources.data))
      .catch((error) => console.log(error));
  }, []);
  const feedList = user.feeds.length
    ? user.feeds.map((feed) => {
        return (
          <FeedListItem
            feed={feed}
            setIsOpen={setIsOpen}
            setDetailFeed={setDetailFeed}
          />
        );
      })
    : "Add some custom feeds to get started";
  return (
    <div id="myFeedsPage">
      <div id="myFeedsListContainer">{feedList}</div>
      <AddFeed user={user} sources={sources} setUser={setUser} />
      {detailFeed && (
        <FeedDetail
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          feed={detailFeed}
          sources={sources}
        />
      )}
    </div>
  );
}

export default MyFeeds;
