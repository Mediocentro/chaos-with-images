import { LocationTask } from "../models/location-task";

export function fetchLocationTaskById(
  riddlesData: Array<LocationTask>,
  id: Number
): LocationTask | undefined {
  return riddlesData
    .filter((riddle) => riddle.id.valueOf() === id.valueOf())
    .at(0);
}

export function fetchLocationById(
  riddlesData: Array<LocationTask>,
  id: Number | undefined
): string | undefined {
  if (id) {
    return riddlesData.filter((riddle) => riddle.id === id).at(0)?.location;
  }
  return;
}
