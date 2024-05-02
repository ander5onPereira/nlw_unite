import { Check, CookingPot } from "lucide-react";

import dayjs from "dayjs";
import { AttendeeI } from "../../interfaces/attendees";
import { forwardRef } from "react";

interface FloatingMenuProps {
  onClose: () => void;
  attendee: AttendeeI;
  onCheckIn: () => void;
  id:string
}
const expectedDateFormat = "ddd, DD MMM YYYY HH:mm:ss [GMT]";
export const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  ({ onClose, attendee, onCheckIn,id }: FloatingMenuProps, ref) => {
    const dataCheckInValid = dayjs(
      attendee?.checkedInAt,
      expectedDateFormat
    ).isValid();
    return (
      <div
        ref={ref}
        id={id}
        className="absolute right-4 mt-0.5 w-24 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10"
      >
        <ul className="py-2">
          <li
            className={`px-2 py-2 ${
              dataCheckInValid
                ? "text-zinc-700"
                : "cursor-pointer hover:bg-zinc-700 "
            }  flex items-center gap-1`}
            onClick={dataCheckInValid ? () => {} : onCheckIn}
          >
            <Check size={16} />
            Check-in
          </li>
          <li
            className="px-2 py-2 cursor-pointer hover:bg-zinc-700 flex items-center gap-1"
            onClick={onClose}
          >
            <CookingPot size={16} />
            Delete
          </li>
        </ul>
      </div>
    );
  }
);
