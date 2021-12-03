import React, { useState } from "react";
import AddFeed from "./AddFeed";
function MyFeeds({ user }) {
  const [feeds, setFeeds] = useState([]);

  return (
    <div id="myFeedsPage">
      <div id="myFeedsListContainer">
        <h2 id="myFeedsHeaderContainer">Your Feeds</h2>
        {/* {feedList} */}
      </div>
      <AddFeed user={user} />
    </div>
  );
}

export default MyFeeds;
