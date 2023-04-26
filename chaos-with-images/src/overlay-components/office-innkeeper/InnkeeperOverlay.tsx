import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

interface Props {
  onClick: any;
  onGoBackToInnKeeperClick: any;
  currentPosition: Number;
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
            out of Impseye. Here are some tips to help you on your way: <br />
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
          </ul>
          <p>
            You can always click here if your fortunes are down, like when
            you're craving chocolate but all you have are hot cross buns.
          </p>
          <div className="flex justify-content-center">
            {props.currentPosition != 1 && (
              <Button
                type="button"
                icon="pi pi-book"
                label="Go back to the Inn"
                onClick={(e) => {
                  op.current?.toggle(e);
                  props.onGoBackToInnKeeperClick();
                }}
              />
            )}
          </div>
        </div>
      </OverlayPanel>
    </div>
  );
};

export default InnKeeperOverlay;
