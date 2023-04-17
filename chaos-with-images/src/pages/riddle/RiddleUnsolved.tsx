import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import DomPurifiedUtil from "../../utils/DomPurifiedUtil";
import { LocationTask } from "../../models/location-task";
import { useState } from "react";

interface Props {
  riddle: LocationTask | undefined;
  onClick: any;
}

const RiddleUnsolved = (props: Props) => {
  const [value, setValue] = useState("");

  function handleClick(inputText: string, riddleId: Number | undefined): void {
    props.onClick(inputText, riddleId);
  }

  return (
    <div>
      <DomPurifiedUtil
        htmlContent={props.riddle?.riddleHtml || ""}
      ></DomPurifiedUtil>
      <div className="card">
        <div className="flex flex-column md:flex-row justify-content-center">
          <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
            <InputText
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-describedby="riddle-help"
            />
          </div>
          <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
            <Button
              icon="pi pi-check"
              className="ml-2"
              label="Check my Answer"
              onClick={() => handleClick(value, props.riddle?.id)}
            ></Button>
          </div>
        </div>
        <p>
          <small id="riddle-help" className="read-the-docs">
            What do you think is the answer to the riddle?
          </small>
        </p>
      </div>
    </div>
  );
};

export default RiddleUnsolved;
