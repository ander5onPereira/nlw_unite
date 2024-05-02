export interface AttendeeI {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
  eventId: string;
}

export interface ResponseI {
  attendees: Array<AttendeeI> | [];
  total: number;
}
