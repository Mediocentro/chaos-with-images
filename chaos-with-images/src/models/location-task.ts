import { QuestItem } from "./quest-item";

export interface LocationTask {
    id: Number;
    name: string;
    location: string;
    imagePath: string;
    riddleHtml: string;
    leftChoice?: Number;
    rightChoice?: Number;
    questItem?: QuestItem;
    correctAnswer: string;
    successTextHtml: string;
    farewellMessage: string;
    isNextRoomTreasureRoom?: boolean;
}