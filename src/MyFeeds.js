import React, { useState } from "react";
import AddFeed from "./AddFeed";
import FeedListItem from "./FeedListItem";
function MyFeeds({ user }) {
  const feedList = user.feeds.map((feed) => {
    return <FeedListItem feed={feed} />;
  });
  return (
    <div id="myFeedsPage">
      <div id="myFeedsListContainer">
        <h2 id="myFeedsHeaderContainer">Your Feeds</h2>
        {feedList}
      </div>
      <AddFeed user={user} />
    </div>
  );
}

export default MyFeeds;
