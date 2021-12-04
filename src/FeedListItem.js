import React from "react";
import Button from "react-bootstrap/button";

function FeedListItem({ feed, setIsOpen, setDetailFeed }) {
  const onDetailClick = () => {
    setDetailFeed(feed);
    setIsOpen(true);
  };
  return (
    <div className="feedListItem">
      <span className="feedListName">{feed.name}</span>
      <Button className="navButton" variant="outline-dark">
        Select
      </Button>
      <Button
        className="navButton"
        variant="outline-dark"
        onClick={onDetailClick}
      >
        Details
      </Button>
      <Button className="navButton" variant="outline-dark">
        Delete
      </Button>
    </div>
  );
}

export default FeedListItem;
