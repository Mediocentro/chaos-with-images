import "./Riddle.css";
import { useState } from "react";
import { LocationTask } from "../../models/location-task";

import RiddleUnsolved from "./RiddleUnsolved";
import RiddleSolved from "./RiddleSolved";

const Riddle = (props: any) => {
  const riddlesData: Array<LocationTask> = props.riddlesData;
  const [riddle, setRiddleData] = useState(
    fetchLocationTaskById(props.initialRiddlePosition)
  );

  function fetchLocationTaskById(id: Number): LocationTask | undefined {
    return riddlesData.filter((riddle) => riddle.id === id).at(0);
  }

  function fetchLocationById(id: Number | undefined): string | undefined {
    if (id) {
      return riddlesData.filter((riddle) => riddle.id === id).at(0)?.location;
    }
    return;
  }

  function handleClick(inputText: string, riddleId: Number | undefined): void {
    props.onClick(inputText, riddleId);
  }

  function handleLocationSwitch(locationId: Number | undefined): void {
    if (locationId) {
      setRiddleData(fetchLocationTaskById(locationId));
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
          leftLocation={fetchLocationById(riddle?.leftChoice)}
          rightLocation={fetchLocationById(riddle?.rightChoice)}
          onClick={(locationId: Number | undefined) =>
            handleLocationSwitch(locationId)
          }
          riddle={riddle}
          riddlesData={riddlesData}
        />
      )}
    </div>
  );
};

export default Riddle;
