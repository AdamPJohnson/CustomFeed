import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
function AddFeed() {
  const [sources, setSources] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const firstUpdate = useRef(true);
  const firstSpec = useRef(true);

  const [currentFeedSpecsText, setCurrentFeedSpecsText] = useState(
    "Pick a source and a topic to start customizing your feed!"
  );
  const [formData, setFormData] = useState({
    source: "",
    category: "",
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
    console.log(specs);
  };
  const onSubmitSpec = (e) => {
    e.preventDefault();
    if (!formData.source) {
      return setErrorMessage("Please select a source");
    }
    if (!formData.category) {
      return setErrorMessage("Please select a category");
    }

    const newSpecs = [...specs];
    const { source, category } = formData;
    const spec = { source, category };
    if (!newSpecs.some((s) => s.source === source && s.category === category)) {
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
      const category =
        specs[specs.length - 1].category.slice(0, 1).toUpperCase() +
        specs[specs.length - 1].category.slice(1);
      if (firstSpec.current) {
        setCurrentFeedSpecsText(`${category} from ${source.name}`);
        firstSpec.current = false;
      } else {
        let newSpecsText = currentFeedSpecsText;
        newSpecsText += `,<br/>${category} from ${source.name}`;
        setCurrentFeedSpecsText(newSpecsText);
      }
    } else {
      firstUpdate.current = false;
    }
  }, [specs]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/sources")
      .then((sources) => setSources(sources.data))
      .catch((error) => console.log(error));
  }, []);
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
        <strong>I want</strong>
        <label htmlFor="category"></label>
        <select
          value={formData.category}
          onChange={onChange}
          name="category"
          id="categories"
        >
          <option value="">Category</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
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
      <input id="feedName" type="text" name="feedName" onChange={onChange} />
      <Button id="submitFeed" onClick={onSubmitFeed}>
        Submit Feed
      </Button>
    </div>
  );
}

export default AddFeed;
