import { Button } from "primereact/button";
import QuestItemDisplay from "../../overlay-components/quest-item-display/QuestItemDisplay";
import DomPurifiedUtil from "../../utils/DomPurifiedUtil";
import FarewellMessage from "../farewell-message/FarewellMessage";
import { LocationTask } from "../../models/location-task";

interface Props {
  riddle: LocationTask | undefined;
  onClick: any;
  riddlesData: Array<LocationTask>;
  leftLocation: string | undefined;
  rightLocation: string | undefined;
  isNewQuestItem: boolean;
}

const RiddleSolved = (props: Props) => {
  function handleLocationSwitch(locationId: Number | undefined): void {
    props.onClick(locationId);
  }

  return (
    <div>
      <div className="mb-4">
        <FarewellMessage message={props.riddle?.farewellMessage} />
      </div>
      <DomPurifiedUtil
        htmlContent={props.riddle?.successTextHtml || ""}
      ></DomPurifiedUtil>
      <div className="card">
        <div className="flex flex-column md:flex-row justify-content-center">
          {props.riddle?.leftChoice && (
            <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
              <Button
                icon="pi pi-arrow-left"
                className="ml-2"
                label={props.leftLocation}
                onClick={() => handleLocationSwitch(props.riddle?.leftChoice)}
              ></Button>
            </div>
          )}
          {props.riddle?.rightChoice && (
            <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
              <Button
                icon="pi pi-arrow-right"
                className="ml-2"
                label={props.rightLocation}
                onClick={() => handleLocationSwitch(props.riddle?.rightChoice)}
              ></Button>
            </div>
          )}
        </div>
      </div>
      {props.isNewQuestItem && props.riddle?.questItem && (
        <QuestItemDisplay questItem={props.riddle.questItem} />
      )}
    </div>
  );
};

export default RiddleSolved;
