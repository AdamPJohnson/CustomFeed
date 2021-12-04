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
      <Button
        variant="outline-dark"
        className="feedListButton"
        onClick={onDetailClick}
        size="s"
      >
        Details
      </Button>
      <Button
        variant="outline-dark"
        className="feedListButton"
        onClick={onDeleteClick}
        size="s"
      >
        Delete
      </Button>
    </div>
  );
}

export default FeedListItem;
