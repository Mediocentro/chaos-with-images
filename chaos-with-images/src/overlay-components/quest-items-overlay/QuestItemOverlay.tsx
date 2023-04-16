import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { QuestItem } from "../../models/quest-item";
import { Badge } from "primereact/badge";

interface Props {
  questItemData: Array<QuestItem | undefined>;
}

interface ItemTemplateItem {
  item: QuestItem | undefined;
}

const ItemTemplate = (props: ItemTemplateItem) => {
  return <div>{props.item && <span>{props.item.name}</span>}</div>;
};

const QuestItemOverlay = (props: Props) => {
  const op = useRef<OverlayPanel>(null);
  console.log(props.questItemData);
  return (
    <div>
      <Button
        type="button"
        icon="pi pi-gift"
        onClick={(e) => op.current?.toggle(e)}
      >
        <Badge value={props.questItemData.length} severity="info"></Badge>
      </Button>
      <OverlayPanel ref={op}>
        <div>
          <p>
            <strong>Quest Items</strong>
          </p>
          {props.questItemData.map((item, index) => (
            <p key={index}>
              <ItemTemplate item={item} />
            </p>
          ))}
        </div>
      </OverlayPanel>
    </div>
  );
};

export default QuestItemOverlay;
