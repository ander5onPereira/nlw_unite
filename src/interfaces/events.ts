import { v4 as uuidv4 } from "uuid";
export interface EventI {
  id: string;
  title: string;
  details: string;
  maximumAttendees: string;
}
export interface ListEventI {
  events: Array<EventI>;
  total: number;
}

export const defaultEvent = {
  id: uuidv4(),
  title: "",
  details: "",
  maximumAttendees: "",
};
