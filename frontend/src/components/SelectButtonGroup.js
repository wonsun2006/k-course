import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function SelectButtonGroup({ toggleList }) {
  const [toggle, setToggle] = useState(0);
  return (
    <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
      {toggleList.map(
        (val, idx) =>
          val.title && (
            <ToggleButton
              id={"menu" + idx}
              value={idx}
              onClick={() => {
                setToggle(idx);
                val.onclick();
              }}
              className="border border-gray500"
              variant={toggle === idx ? "primary" : "gray100"}
              size="sm"
              //   style={{ width: "80px" }}
            >
              {val.title}
            </ToggleButton>
          )
      )}
    </ToggleButtonGroup>
  );
}

export default SelectButtonGroup;
