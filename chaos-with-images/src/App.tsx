import { useRef, useState } from "react";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import "./App.css";
import Riddle from "./pages/riddle/Riddle";
import { LocationTask } from "./models/location-task";
import data from "./assets/final_data.json";

import { encode } from "base-64";
import { QuestItem } from "./models/quest-item";
import InnKeeperOverlay from "./overlay-components/office-innkeeper/InnkeeperOverlay";
import QuestItemOverlay from "./overlay-components/quest-items-overlay/QuestItemOverlay";
import EasterEgg from "./pages/easter-egg/EasterEgg";
import getRandomNumberInRange from "./utils/RandomNumberGenerator";
import { fetchLocationById } from "./utils/RiddlesDataUtil";
import { Dialog } from "primereact/dialog";

function App() {
  const toast = useRef<Toast>(null);

  const [isNewQuestItem, setIsNewQuestItem] = useState(false);
  const [questItemIdSet, setQuestItemIdSet] = useState(new Set<Number>());
  const [questItemData, setQuestItemData] = useState(
    new Array<QuestItem | undefined>()
  );
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [initialRiddlePosition, setInitialRiddlePosition] = useState(
    new Number(1)
  );
  const [currentRiddlePosition, setCurrentRiddlePosition] = useState(
    new Number(1)
  );
  const leftLocationId = getRandomNumberInRange(2, 13, 1);
  const rightLocationId = getRandomNumberInRange(2, 13, leftLocationId);
  const [isRiddleVisible, setRiddleVisible] = useState(true);

  const riddlesData: Array<LocationTask> = JSON.parse(
    JSON.stringify(data["location-tasks"])
  );

  const riddlesMap: Map<Number, LocationTask> = new Map(
    riddlesData.map((locationTask) => {
      return [locationTask.id, locationTask];
    })
  );

  const [isRiddleSolved, setRiddleSolved] = useState(false);

  function checkValidity(inputText: string, riddleId: Number): void {
    if (
      encode(inputText.toLowerCase()) ===
      riddlesMap.get(riddleId)?.correctAnswer
    ) {
      setRiddleSolved(true);
      setQuestItemInfo(riddleId);
      checkFurtherJobs(riddleId);
    } else {
      showFailure();
    }
  }

  function setQuestItemInfo(riddleId: Number) {
    let checkIfQuestItemIsNew: boolean = addQuestItem(
      riddlesMap.get(riddleId)?.questItem
    );
    setIsNewQuestItem(checkIfQuestItemIsNew);
    if (checkIfQuestItemIsNew) {
      questItemData.push(riddlesMap.get(riddleId)?.questItem);
      setQuestItemData(questItemData);
    }
  }

  function addQuestItem(questItem: QuestItem | undefined): boolean {
    if (questItem && !questItemIdSet.has(questItem.id)) {
      questItemIdSet.add(questItem.id);
      setQuestItemIdSet(questItemIdSet);
      return true;
    }
    return false;
  }

  function checkFurtherJobs(riddleId: Number) {
    if (
      !(
        riddlesMap.get(riddleId)?.leftChoice &&
        riddlesMap.get(riddleId)?.rightChoice
      )
    ) {
      showSuccess("No more jobs left!");
      return;
    }
    showSuccess("Onto the next job");
  }

  const showSuccess = (inputText: string): void => {
    toast.current?.show({
      severity: "success",
      summary: "Correct!",
      detail: inputText,
    });
  };

  const showFailure = (): void => {
    toast.current?.show({
      severity: "error",
      summary: "Incorrect :(",
      detail: "Please Try Again",
    });
  };

  function resetStates() {
    setIsNewQuestItem(false);
    setRiddleSolved(false);
  }

  function easterEggCountIncrease() {
    if (easterEggCount === -1) {
      return;
    }
    if (easterEggCount >= 3) {
      setCurrentRiddlePosition(15);
    }
    setEasterEggCount(easterEggCount + 1);
  }

  return (
    <div className="App">
      <Toast ref={toast} />
      <div className="flex flex-column md:flex-row justify-content-center mb-3">
        <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
          <InnKeeperOverlay
            onClick={() => easterEggCountIncrease()}
            onGoBackToInnKeeperClick={() => {
              resetStates();
              setInitialRiddlePosition(1);
              setCurrentRiddlePosition(1);
              setRiddleVisible(false);
            }}
            currentPosition={currentRiddlePosition}
          />
        </div>
        <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
          <QuestItemOverlay questItemData={questItemData} />
        </div>
      </div>

      {!isRiddleVisible && (
        <Dialog
          header="Hold Tight!"
          visible={!isRiddleVisible}
          onHide={() => setRiddleVisible(true)}
        >
          <p>You're heading back to the Inn.</p>
        </Dialog>
      )}

      {(easterEggCount < 3 || easterEggCount == -1) && isRiddleVisible && (
        <Riddle
          onClick={(value: string, id: Number) => checkValidity(value, id)}
          onLocationSwitch={(locationId: Number) => {
            resetStates();
            setCurrentRiddlePosition(locationId);
          }}
          riddleSolved={isRiddleSolved}
          initialRiddlePosition={initialRiddlePosition}
          riddlesData={riddlesData}
          isNewQuestItem={isNewQuestItem}
        />
      )}
      {easterEggCount != -1 && easterEggCount >= 3 && (
        <EasterEgg
          onLocationSelection={(locationId: Number | undefined) => {
            resetStates();
            setEasterEggCount(-1);
            setInitialRiddlePosition(locationId || 1);
            setCurrentRiddlePosition(locationId || 1);
          }}
          leftLocation={fetchLocationById(riddlesData, leftLocationId)}
          rightLocation={fetchLocationById(riddlesData, rightLocationId)}
          leftLocationId={leftLocationId}
          rightLocationId={rightLocationId}
        />
      )}
    </div>
  );
}

export default App;
