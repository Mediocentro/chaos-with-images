import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import "./Riddle.css";
import { useEffect, useState } from "react";

const Riddle = (props: any) => {
  const [value, setValue] = useState("");

  function handleClick(inputText: String): void {
    props.onClick(inputText);
  }

  useEffect(() => {
    console.log(props.riddleSolved);
  }, [props.riddleSolved]);

  return (
    <div>
      <div>
        <img src="innkeeper.jpg" className="logo" alt="Riddle" />
      </div>
      <div>
        <h2>Innkeeper</h2>
        {!props.riddleSolved && (
          <p>
            I am a challenge for every developer, <br /> Yet without me, their
            code is an unsolved puzzle. <br /> I am given before the product
            launch, <br /> And if you fail me, the results will be a blow.
            <br />
            <br /> What am I?
          </p>
        )}
        {props.riddleSolved && (
          <p>
            Well done traveller! <br />
            Now you have the following jobs to choose from:
            <br />
            <i>
              Protect the village of Tension Kimbap (name TBD) from the Abyss
              Order
            </i>
            <br />
            <i>Help a farmer plant melons in PewPew Gully</i>
            <br />
            Make your choice!
          </p>
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
          <Button
            icon="pi pi-arrow-left"
            className="ml-2"
            label="Tension Kimbap"
            onClick={() => handleClick(value)}
          ></Button>
          <Button
            icon="pi pi-arrow-right"
            className="ml-2"
            label="PewPew Gully"
            onClick={() => handleClick(value)}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default Riddle;
