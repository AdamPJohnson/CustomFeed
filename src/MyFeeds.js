import React, { useState } from "react";

function MyFeeds({ user }) {
  const [headlines, setHeadlines] = useState([]);
  const headlineList = headlines.map((headline) => {
    return <HeadlineContainer headline={headline} />;
  });
  return (
    <div id="topHeadlinesContainer">
      <h2 id="topHeadlinesHeader">Your Feeds</h2>
      {headlineList}
    </div>
  );
}

export default MyFeeds;
