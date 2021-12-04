import React from "react";
import { Button } from "@chakra-ui/react";
function FeedListItem({ feed, setModalIsOpen, setDetailFeed }) {
  const onDetailClick = () => {
    setDetailFeed(feed);
    setModalIsOpen(true);
  };
  return (
    <div className="feedListItem">
      <span className="feedListName">{feed.name}</span>
      <Button size="xs">Select</Button>
      <Button onDetailClick={onDetailClick} size="xs">
        Details
      </Button>
      <Button size="xs">Delete</Button>
    </div>
  );
}

export default FeedListItem;
