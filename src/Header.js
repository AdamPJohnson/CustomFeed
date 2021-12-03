import React from "react";
import Button from "react-bootstrap/button";
function Header() {
  return (
    <div id="header">
      <span id="headerTitle">custom feed</span>
      <div id="navButtons">
        <Button variant="outline-light">Home</Button>
        <Button variant="outline-light">My Feeds</Button>
      </div>
    </div>
  );
}

export default Header;
