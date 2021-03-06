import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    borderRadius: "10px",
    border: "none",
    boxShadow: "1px 1px 5px rgba(0,0,0,0.2)",
    alignSelf: "center",
  },
};

function FeedDetail({ feed, isOpen, setIsOpen, sources }) {
  const rules = feed.rules.length
    ? feed.rules.map((rule) => {
        let ruleSource = sources.filter((source) => {
          console.log(source.id, rule.source);
          return source.id === rule.source;
        })[0];
        ruleSource = ruleSource ? ruleSource.name : rule.source;
        const ruleCategory = rule.category
          ? rule.category.slice(0, 1).toUpperCase() + rule.category.slice(1)
          : "none";
        return (
          <>
            <strong>Source:</strong>
            <span>{ruleSource}</span>
          </>
        );
      })
    : "This feed has no rules";

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      id="detailModal"
      centered
    >
      <div id="modalContents">
        <span id="feedModalName">{feed.name}</span>
        {rules}
      </div>
    </Modal>
  );
}

export default FeedDetail;
