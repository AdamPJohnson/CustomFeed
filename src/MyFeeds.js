import React, { useState } from "react";

function MyFeeds({ user }) {
  const [headlines, setHeadlines] = useState([]);
  const headlineList = headlines.map((headline) => {
    return <HeadlineContainer headline={headline} />;
  });
  return (
    <div id="myFeedsContainer">
      <div id="myFeedsHeadlinesContainer">
        <h2 id="myFeedsHeaderContainer">Your Feeds</h2>
        {headlineList}
      </div>
      <div id="addANewFeed"></div>
    </div>
  );
}

export default MyFeeds;
