import { useState } from "react";
import { QuestItem } from "../../models/quest-item";
import { Dialog } from "primereact/dialog";

interface QuestItemProps {
  questItem: QuestItem;
}

const QuestItemDisplay = (questItemProps: QuestItemProps) => {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <Dialog
        header="Congratulations!"
        onHide={() => setVisible(false)}
        visible={visible}
      >
        <p>For your correct answer here's a reward you can use later on: </p>
        <p>
          <i className="pi pi-gift text-indigo-500 text-xl"></i>{" "}
          {questItemProps.questItem.name}
        </p>
      </Dialog>
    </div>
  );
};

export default QuestItemDisplay;
