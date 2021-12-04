import React from "react";
import Modal from "react-modal";

function FeedDetail({ feed, isOpen }) {
  return <Modal isOpen={isOpen}>{feed.name}</Modal>;
}

export default FeedDetail;
