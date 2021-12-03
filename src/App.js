import React from "react";
import axios from "axios";
function App() {
  axios
    .get("http://localhost:3000/headlines/trump")
    .then((headlines) => console.log(headlines));

  return <div>hi</div>;
}

export default App;
