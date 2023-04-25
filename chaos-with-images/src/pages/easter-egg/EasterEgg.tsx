import { LocationTask } from "../../models/location-task";
import easterEgg from "../../assets/easter-egg.json";
import RiddleSolved from "../riddle/RiddleSolved";
import _ from "lodash";

interface Props {
  onLocationSelection: any;
  leftLocationId: Number;
  rightLocationId: Number;
  leftLocation: string | undefined;
  rightLocation: string | undefined;
}

const EasterEgg = (props: Props) => {
  const easterEggData: LocationTask = JSON.parse(JSON.stringify(easterEgg));
  console.log(props);

  function handleLocationSwitch(locationId: Number | undefined): void {
    if (locationId) {
      props.onLocationSelection(locationId);
    }
  }

  return (
    <div>
      <div>
        <img
          src={easterEggData?.imagePath}
          className="logo max-w-full h-auto"
          alt="Riddle"
          height="1200"
          width="630"
        />
      </div>
      <div>
        <h2>{easterEggData?.name}</h2>
      </div>
      <RiddleSolved
        isNewQuestItem={false}
        leftLocation={props.leftLocation}
        rightLocation={props.rightLocation}
        leftLocationId={props.leftLocationId}
        rightLocationId={props.rightLocationId}
        onClick={(locationId: Number | undefined) =>
          handleLocationSwitch(locationId)
        }
        riddle={easterEggData}
      />
    </div>
  );
};

export default EasterEgg;
