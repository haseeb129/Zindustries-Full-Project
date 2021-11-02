import React, { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import { Form, Row, Col } from "react-bootstrap";
const RangeSliderCustom = ({ onChangeParent, element }) => {
  const [value, setValue] = useState(element.defval);
  const handleChange = (nextChecked) => {
    console.log("nextChecked", nextChecked.target.value);
    setValue(nextChecked.target.value);
    onChangeParent(nextChecked.target.value, element);
  };
  return (
    <Row>
      <Col xs={3} style={{ paddingRight: "0px" }}>
        <Form.Control value={value} />
      </Col>

      <Col xs={9} style={{ paddingLeft: "5px" }}>
        <RangeSlider
          value={value}
          step={element.type == "Int" ? 1 : 0.1}
          min={element.min}
          max={element.max}
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
};

export default RangeSliderCustom;
