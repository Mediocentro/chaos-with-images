import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

const FarewellMessage = (props: any) => {
  const [read, setRead] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button
        type="button"
        label="Message For You"
        icon="pi pi-envelope"
        className="p-button-warning"
        onClick={() => {
          setVisible(true);
          setRead(true);
        }}
      >
        {!read && <Badge value="1" severity="danger"></Badge>}
      </Button>
      <Dialog
        header="Message"
        visible={visible}
        className="w-6"
        onHide={() => setVisible(false)}
      >
        {props.message}
      </Dialog>
    </div>
  );
};

export default FarewellMessage;
