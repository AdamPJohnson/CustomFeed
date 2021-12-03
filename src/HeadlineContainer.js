import React from "react";

function HeadlineContainer({ headline }) {
  const { source, author, title, description, url, urlToImage, publishedAt } =
    headline;

  return (
    <a className="headlineLink" href={url}>
      <div className="headlineContainer">
        <div className="headlineDetails">
          <span className="headlineTitle">{title}</span>
          <br />
          <span className="headlineDescription">{description}</span>
          <br />
          <span className="headlineAuthor">{author}</span>
          <br />
          <span className="headlineSource">{source.name}</span>
        </div>
        <img className="headlineImage" src={urlToImage} />
      </div>
    </a>
  );
}

export default HeadlineContainer;
