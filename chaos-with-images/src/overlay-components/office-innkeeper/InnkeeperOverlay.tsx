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
        label="From the office of Innkeeper"
        onClick={(e) => {
          op.current?.toggle(e);
          props.onClick();
        }}
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
    </div>
  );
};

export default InnKeeperOverlay;
