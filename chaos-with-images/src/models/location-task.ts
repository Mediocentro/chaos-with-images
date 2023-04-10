export interface LocationTask {
    id: Number;
    name: String;
    imagePath: String;
    riddle: String;
    leftChoice?: Number;
    rightChoice?: Number;
    questItemId?: Number;
    correctAnswer: String;
}