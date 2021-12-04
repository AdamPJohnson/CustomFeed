import React from "react";
import Button from "react-bootstrap/button";
function Header({ setPage, user }) {
  return (
    <div id="header">
      <span id="headerTitle">custom feed</span>
      <div id="navButtons">
        <span id="welcome">Welcome, {user.name}!</span>
        <div id="buttonContainer">
          <Button
            className="navButton"
            onClick={() => setPage("home")}
            variant="outline-light"
          >
            Home
          </Button>
          <Button
            className="navButton"
            onClick={() => setPage("myfeeds")}
            variant="outline-light"
          >
            My Feeds
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
