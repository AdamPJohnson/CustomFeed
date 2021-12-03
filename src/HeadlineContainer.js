import React from "react";

function HeadlineContainer({ headline }) {
  const { source, author, title, description, url, urlToImage, publishedAt } =
    headline;

  return (
    <div className="headlineContainer">
      <a className="headlineLink" href={url}>
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
      </a>
    </div>
  );
}

export default HeadlineContainer;
