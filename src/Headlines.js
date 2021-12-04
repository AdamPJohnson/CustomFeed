import React, { useState } from "react";
import HeadlineContainer from "./HeadlineContainer.js";

function Headlines({ headlines, user, setCurrentFeed, currentFeed }) {
  const [currentFeedName, setCurrentFeedName] = useState("Select a Feed...");
  const onFeedChange = (e) => {
    const feedObj = user.feeds.filter(
      (feed) => feed.name === e.target.value
    )[0];
    setCurrentFeed(feedObj);
    setCurrentFeedName(e.target.value);
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
          value={currentFeedName}
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
