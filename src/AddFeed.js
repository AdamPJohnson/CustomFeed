import React, { useState, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
function AddFeed({ sources, user, setUser }) {
  const [specs, setSpecs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const firstUpdate = useRef(true);
  const firstSpec = useRef(true);

  const [currentFeedSpecsText, setCurrentFeedSpecsText] = useState(
    "Pick a source to start customizing your feed!"
  );
  const [formData, setFormData] = useState({
    source: "",
    feedName: "",
  });

  const onSubmitFeed = (e) => {
    if (!specs.length) {
      return setErrorMessage("Add some news!");
    }
    if (!formData.feedName) {
      return setErrorMessage("Please name this feed");
    }
    e.preventDefault();
    console.log(user.name);
    const payload = {
      feedName: formData.feedName,
      specs,
      userName: user.name,
    };
    console.log(payload);
    axios
      .patch("http://localhost:3000/feeds/", payload)
      .then((d) => {
        setErrorMessage("");
        setUser(d.data);
        console.log(d);
      })
      .catch((e) => {
        setErrorMessage("Something went wrong");
        console.log(e);
      });
  };
  const onSubmitSpec = (e) => {
    e.preventDefault();
    if (!formData.source) {
      return setErrorMessage("Please select a source");
    }

    const newSpecs = [...specs];
    const { source } = formData;
    const spec = { source };
    if (!newSpecs.some((s) => s.source === source)) {
      newSpecs.push(spec);
      setSpecs(newSpecs);
    }
  };
  const onChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };
  useEffect(() => {
    if (!firstUpdate.current) {
      const source = sources.filter(
        (s) => s.id === specs[specs.length - 1].source
      )[0];

      if (firstSpec.current) {
        setCurrentFeedSpecsText(`${source.name}`);
        firstSpec.current = false;
      } else {
        let newSpecsText = currentFeedSpecsText;
        newSpecsText += `,<br/>${source.name}`;
        setCurrentFeedSpecsText(newSpecsText);
      }
    } else {
      firstUpdate.current = false;
    }
  }, [specs]);

  useEffect(() => {
    console.log(currentFeedSpecsText);
    document.getElementById("currentFeedSpecsText").innerHTML =
      currentFeedSpecsText;
  }, [currentFeedSpecsText]);

  const sourceOptions = sources.map((source) => {
    return <option value={source.id}>{source.name}</option>;
  });
  return (
    <div id="addFeed">
      <h4>Add a Custom Feed!</h4>

      <form id="addFeedForm">
        <strong>I want news</strong>

        <strong>from</strong>
        <label htmlFor="source"></label>
        <select
          value={formData.source}
          onChange={onChange}
          name="source"
          id="sources"
        >
          <option value="">Source</option>
          {sourceOptions}
        </select>
        <Button id="submitSpec" onClick={onSubmitSpec}>
          Add To Feed
        </Button>
        <span id="errorMessage">{errorMessage}</span>
      </form>
      <div id="currentFeedSpecsText"></div>
      <label htmlFor="feedName">Feed Name:</label>
      <input
        id="feedName"
        type="text"
        name="feedName"
        value={formData.feedName}
        onChange={onChange}
      />
      <Button id="submitFeed" onClick={onSubmitFeed}>
        Submit Feed
      </Button>
    </div>
  );
}

export default AddFeed;
