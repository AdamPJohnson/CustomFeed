import React, { useState } from "react";
import HeadlineContainer from "./HeadlineContainer.js";

function Headlines({ headlines, user }) {
  const [currentFeed, setCurrentFeed] = useState("");

  const onFeedChange = (e) => {
    setCurrentFeed(e.target.value);
    console.log(currentFeed);
  };
  const headlineList = headlines.map((headline) => {
    return <HeadlineContainer headline={headline} />;
  });

  const feedList = user.feeds
    ? user.feeds.map((feed) => {
        return <option value={feed.name}>{feed.name}</option>;
      })
    : [];
  return (
    <div id="topHeadlinesContainer">
      <div id="headlineHeader">
        <h2 id="topHeadlinesHeader">Top Headlines</h2>

        <select
          value={currentFeed}
          onChange={onFeedChange}
          name="feed"
          id="feeds"
        >
          <option value="">Select a Feed...</option>
          {feedList}
        </select>
      </div>
      {headlineList}
    </div>
  );
}

export default Headlines;
