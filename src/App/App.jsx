import PropTypes from "prop-types";
import clsx from "clsx";
import "./App.css";
import { useState } from "react";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);

  return (
    <div className="App">
      <Input
        type="text"
        value={inputValue}
        onChange={setInputValue}
        placeholder="Placeholder"
      />
      <div className="row">
        <Checkbox checked={check} onChange={setCheck}>
          Done
        </Checkbox>
        <Button>Button</Button>
        <Button variant="text">Cancel</Button>
        <Button variant="icon" icon="more" size="small" />
        <Button variant="icon" icon="close" size="medium" />
        <Button variant="icon" icon="add" size="large" />
        <Button variant="danger">Button</Button>
        <Button variant="dashed">Button</Button>
      </div>
      <Card
        title="Title"
        text="Lorem ipsum dolor sit amet consectetur. Hendrerit metus etiam in sed vulputate tellus diam dui. "
      />
    </div>
  );
};
