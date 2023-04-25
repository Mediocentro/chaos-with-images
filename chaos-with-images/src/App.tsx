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
  const [leftLocationId, setLeftLocationId] = useState(
    getRandomNumberInRange(2, 13, 1)
  );
  const [rightLocationId, setRightLocationId] = useState(
    getRandomNumberInRange(2, 13, leftLocationId)
  );

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
    if (encode(inputText) === riddlesMap.get(riddleId)?.correctAnswer) {
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
    setEasterEggCount(easterEggCount + 1);
  }

  return (
    <div className="App">
      <Toast ref={toast} />
      <div className="flex flex-column md:flex-row justify-content-center mb-3">
        <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
          <InnKeeperOverlay onClick={() => easterEggCountIncrease()} />
        </div>
        <div className="flex-1 md:flex-none flex align-items-center justify-content-center m-2">
          <QuestItemOverlay questItemData={questItemData} />
        </div>
      </div>

      {(easterEggCount < 3 || easterEggCount == -1) && (
        <Riddle
          onClick={(value: string, id: Number) => checkValidity(value, id)}
          onLocationSwitch={() => resetStates()}
          riddleSolved={isRiddleSolved}
          initialRiddlePosition={initialRiddlePosition}
          riddlesData={riddlesData}
          isNewQuestItem={isNewQuestItem}
        />
      )}
      {easterEggCount != -1 && easterEggCount == 3 && (
        <EasterEgg
          onLocationSelection={(locationId: Number | undefined) => {
            resetStates();
            setEasterEggCount(-1);
            setInitialRiddlePosition(locationId || 1);
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
