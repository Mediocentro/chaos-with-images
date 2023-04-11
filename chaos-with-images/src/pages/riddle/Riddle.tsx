import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import "./Riddle.css";
import { useState } from "react";
import { LocationTask } from "../../models/location-task";

import DomPurifiedUtil from "../../utils/DomPurifiedUtil";

const Riddle = (props: any) => {
  const riddlesData: Array<LocationTask> = props.riddlesData;
  const [value, setValue] = useState("");
  const [riddle, setRiddleData] = useState(
    fetchLocationTaskById(props.initialRiddlePosition)
  );

  function fetchLocationTaskById(id: Number): LocationTask | undefined {
    return riddlesData.filter((riddle) => riddle.id === id).at(0);
  }

  function fetchLocationById(id: Number): string | undefined {
    return riddlesData.filter((riddle) => riddle.id === id).at(0)?.location;
  }

  function handleClick(inputText: string): void {
    props.onClick(inputText);
  }

  function handleLocationSwitch(locationId: Number | undefined): void {
    if (locationId) {
      setRiddleData(fetchLocationTaskById(locationId));
      setValue("");
      props.onLocationSwitch();
    }
  }

  return (
    <div>
      <div>
        <img
          src={riddle?.imagePath}
          className="logo max-w-full h-auto"
          alt="Riddle"
        />
      </div>
      <div>
        <h2>{riddle?.name}</h2>
        {!props.riddleSolved && (
          <DomPurifiedUtil
            htmlContent={riddle?.riddleHtml || ""}
          ></DomPurifiedUtil>
        )}
        {props.riddleSolved && (
          <DomPurifiedUtil
            htmlContent={riddle?.successTextHtml || ""}
          ></DomPurifiedUtil>
        )}
      </div>
      {!props.riddleSolved && (
        <div className="card">
          <InputText
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby="riddle-help"
          />
          <Button
            icon="pi pi-check"
            className="ml-2"
            label="Check my Answer"
            onClick={() => handleClick(value)}
          ></Button>
          <p>
            <small id="riddle-help" className="read-the-docs">
              What do you think is the answer to the riddle?
            </small>
          </p>
        </div>
      )}
      {props.riddleSolved && (
        <div className="card">
          {riddle?.leftChoice && (
            <Button
              icon="pi pi-arrow-left"
              className="ml-2"
              label={fetchLocationById(riddle.leftChoice)}
              onClick={() => handleLocationSwitch(riddle.leftChoice)}
            ></Button>
          )}
          {riddle?.rightChoice && (
            <Button
              icon="pi pi-arrow-right"
              className="ml-2"
              label={fetchLocationById(riddle.rightChoice)}
              onClick={() => handleLocationSwitch(riddle.rightChoice)}
            ></Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Riddle;
