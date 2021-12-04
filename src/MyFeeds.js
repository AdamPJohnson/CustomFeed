import React, { useState } from "react";
import AddFeed from "./AddFeed";
import FeedListItem from "./FeedListItem";
import FeedDetail from "./FeedDetail";
function MyFeeds({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [detailFeed, setDetailFeed] = useState(null);
  const feedList = user.feeds.map((feed) => {
    return (
      <FeedListItem
        feed={feed}
        setIsOpen={setIsOpen}
        setDetailFeed={setDetailFeed}
      />
    );
  });
  return (
    <div id="myFeedsPage">
      <div id="myFeedsListContainer">
        <h2 id="myFeedsHeaderContainer">Your Feeds</h2>
        {feedList}
      </div>
      <AddFeed user={user} />
      {detailFeed && <FeedDetail isOpen={isOpen} feed={detailFeed} />}
    </div>
  );
}

export default MyFeeds;
