import { Button } from "primereact/button";
import QuestItemDisplay from "../../overlay-components/quest-item-display/QuestItemDisplay";
import DomPurifiedUtil from "../../utils/DomPurifiedUtil";
import FarewellMessage from "../../overlay-components/farewell-message/FarewellMessage";
import { LocationTask } from "../../models/location-task";

interface Props {
  riddle: LocationTask | undefined;
  onClick: any;
  leftLocation?: string | undefined;
  rightLocation?: string | undefined;
  leftLocationId?: Number;
  rightLocationId?: Number;
  isNewQuestItem: boolean;
  onTreasureRoomSwitch?: any;
}

const RiddleSolved = (props: Props) => {
  function handleLocationSwitch(locationId: Number | undefined): void {
    props.onClick(locationId);
  }

  function handleTreasureRoomSwitch() {
    props.onTreasureRoomSwitch();
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
          {(props.riddle?.leftChoice || props.leftLocationId) && (
            <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
              <Button
                icon="pi pi-arrow-left"
                className="ml-2"
                label={props.leftLocation}
                onClick={() =>
                  handleLocationSwitch(
                    props.riddle?.leftChoice || props.leftLocationId
                  )
                }
              ></Button>
            </div>
          )}
          {(props.riddle?.rightChoice || props.rightLocationId) && (
            <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
              <Button
                icon="pi pi-arrow-right"
                className="ml-2"
                label={props.rightLocation}
                onClick={() =>
                  handleLocationSwitch(
                    props.riddle?.rightChoice || props.rightLocationId
                  )
                }
              ></Button>
            </div>
          )}
          {props.riddle?.isNextRoomTreasureRoom && (
            <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
              <Button
                icon="pi pi-flag-fill"
                className="ml-2"
                label="Treasure Room"
                onClick={() => handleTreasureRoomSwitch()}
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
