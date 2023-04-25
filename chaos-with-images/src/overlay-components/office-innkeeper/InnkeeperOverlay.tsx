import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

interface Props {
  onClick: any;
}

const InnKeeperOverlay = (props: Props) => {
  const op = useRef<OverlayPanel>(null);
  return (
    <div>
      <Button
        type="button"
        icon="pi pi-info-circle"
        label="The Innkeepers' Counsel"
        onClick={(e) => {
          op.current?.toggle(e);
          props.onClick();
        }}
      />
      <OverlayPanel ref={op}>
        <div className="w-18rem">
          <p>
            Complete Requests to gain Items that will help you unlock the portal
            out of Impseye.
            <br />
            Here are some tips to help you in your way: <br />
          </p>
          <ul>
            <li>All the answers are in lowercase</li>
            <li>
              The answers use only letters, not numbers or other characters
            </li>
            <li>
              Some of the answers are more than one word, so be careful about
              the use of spaces
            </li>
            <li>
              You can always click here if your fotunes are down, like when
              you're craving chocolate but all you have are hot cross buns.
            </li>
          </ul>
        </div>
      </OverlayPanel>
    </div>
  );
};

export default InnKeeperOverlay;
