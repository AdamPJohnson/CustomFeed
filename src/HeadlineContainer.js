import React from "react";

function HeadlineContainer({ headline }) {
  const { source, author, title, description, url, urlToImage, publishedAt } =
    headline;

  return (
    <a className="headlineLink" href={url}>
      <div className="headlineContainer">
        <div className="headlineDetails">
          <strong className="headlineTitle">{title}</strong>
          <br />
          <span className="headlineDescription">{description}</span>
          <br />
          <em className="headlineAuthor">{author}</em>
          {", "}
          <em className="headlineSource">{source.name}</em>
        </div>
        <img className="headlineImage" src={urlToImage} />
      </div>
    </a>
  );
}

export default HeadlineContainer;
