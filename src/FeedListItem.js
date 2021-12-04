import React from "react";
import { Button } from "@chakra-ui/react";
function FeedListItem({ feed, setIsOpen, setDetailFeed }) {
  const onDetailClick = () => {
    setDetailFeed(feed);
    setIsOpen(true);
  };
  return (
    <div className="feedListItem">
      <span className="feedListName">{feed.name}</span>
      <Button size="xs">Select</Button>
      <Button onClick={onDetailClick} size="xs">
        Details
      </Button>
      <Button size="xs">Delete</Button>
    </div>
  );
}

export default FeedListItem;
