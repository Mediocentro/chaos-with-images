import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import "./App.css";
import Riddle from "./pages/riddle/Riddle";
import { LocationTask } from "./models/location-task";
import data from "./assets/data.json";

import { encode } from "base-64";

function App() {
  const toast = useRef<Toast>(null);
  const op = useRef<OverlayPanel>(null);

  const riddlesData: Array<LocationTask> = JSON.parse(
    JSON.stringify(data["location-tasks"])
  );

  const [isRiddleSolved, setRiddleSolved] = useState(false);

  function checkValidity(inputText: string): void {
    if (encode(inputText) === riddlesData.at(0)?.correctAnswer) {
      setRiddleSolved(true);
      showSuccess("Onto the next job");
    } else {
      showFailure();
    }
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

  return (
    <div className="App">
      <Toast ref={toast} />
      <Button
        type="button"
        icon="pi pi-info-circle"
        label="From the office of Innkeeper"
        onClick={(e) => op.current?.toggle(e)}
        className="mb-3"
      />
      <OverlayPanel ref={op}>
        <p>
          Welcome on the quest to unlock a deep secret!
          <br />
          Rules of the game are very simple: <br />
        </p>
        <ul>
          <li>
            There are 10 items to collect which will guide you to key to your
            treasure
          </li>
          <li>
            There are a few jobs that you can do along the way to get these
            items
          </li>
        </ul>
        <p>Start by answering my riddle!</p>
      </OverlayPanel>
      <Riddle
        onClick={(value: string) => checkValidity(value)}
        onLocationSwitch={() => setRiddleSolved(false)}
        riddleSolved={isRiddleSolved}
        initialRiddlePosition={1}
        riddlesData={riddlesData}
      />
    </div>
  );
}

export default App;
