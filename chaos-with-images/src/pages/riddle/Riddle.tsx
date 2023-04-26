import "./Riddle.css";
import { useState } from "react";

import RiddleUnsolved from "./RiddleUnsolved";
import RiddleSolved from "./RiddleSolved";

import {
  fetchLocationTaskById,
  fetchLocationById,
} from "../../utils/RiddlesDataUtil";

const Riddle = (props: any) => {
  const [riddle, setRiddleData] = useState(
    fetchLocationTaskById(props.riddlesData, props.initialRiddlePosition)
  );

  function handleClick(inputText: string, riddleId: Number | undefined): void {
    props.onClick(inputText, riddleId);
  }

  function handleLocationSwitch(locationId: Number | undefined): void {
    if (locationId) {
      setRiddleData(fetchLocationTaskById(props.riddlesData, locationId));
      props.onLocationSwitch(locationId);
    }
  }

  return (
    <div>
      <div>
        <img
          src={riddle?.imagePath}
          className="logo max-w-full h-auto"
          alt="Riddle"
          height="1200"
          width="630"
        />
      </div>
      <div>
        <h2>{riddle?.name}</h2>
      </div>
      {!props.riddleSolved && (
        <RiddleUnsolved
          riddle={riddle}
          onClick={(value: string, id: Number) => handleClick(value, id)}
        />
      )}
      {props.riddleSolved && (
        <RiddleSolved
          isNewQuestItem={props.isNewQuestItem}
          leftLocation={fetchLocationById(
            props.riddlesData,
            riddle?.leftChoice
          )}
          rightLocation={fetchLocationById(
            props.riddlesData,
            riddle?.rightChoice
          )}
          onClick={(locationId: Number | undefined) =>
            handleLocationSwitch(locationId)
          }
          riddle={riddle}
        />
      )}
    </div>
  );
};

export default Riddle;
