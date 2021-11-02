import React, { Component, useState } from "react";
import Switch from "react-switch";
const BasicHooksExample = ({ onChangeParent, element }) => {
  const [checked, setChecked] = useState(element.defval);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    console.log("nextChecked", nextChecked);
    onChangeParent(nextChecked, element);
  };

  return (
    <div>
      <Switch
        onColor="#007bff"
        onChange={handleChange}
        checked={checked}
        className="react-switch"
      />
    </div>
  );
};
export default BasicHooksExample;
