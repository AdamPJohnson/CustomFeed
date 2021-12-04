import React from "react";
import Button from "react-bootstrap/button";
import axios from "axios";
function FeedListItem({ feed, setIsOpen, setDetailFeed, user, setUser }) {
  const onDetailClick = () => {
    setDetailFeed(feed);
    setIsOpen(true);
  };

  const onDeleteClick = () => {
    axios
      .patch(`http://localhost:3000/feeds/${feed.name}/${user.name}`)
      .then(() => {
        axios
          .get(`http://localhost:3000/users/${user.name}`)
          .then((d) => {
            setUser(d.data[0]);
          })
          .catch((error) => console.log({ error }));
      });
  };
  return (
    <div className="feedListItem">
      <span className="feedListName">{feed.name}</span>
      <div className="feedListButtons">
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
    </div>
  );
}

export default FeedListItem;
