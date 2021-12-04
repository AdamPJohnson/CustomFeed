import React from "react";
import Button from "react-bootstrap/button";

function FeedListItem({ feed, setIsOpen, setDetailFeed }) {
  const onDetailClick = () => {
    setDetailFeed(feed);
    setIsOpen(true);
  };
  const onDeleteClick = () => {
    console.log(feed.name);
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
