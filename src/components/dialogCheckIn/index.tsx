import { useAttendees } from "../../hooks/attendees";
import { AttendeeI } from "../../interfaces/attendees";

interface DialogCheckInProps{
  title:string, 
  idDialog:string, 
  attendee:AttendeeI
}
export function DialogCheckIn({ title, idDialog, attendee}: DialogCheckInProps) {
  const {  handlerCheckIn,closeDialog } = useAttendees();

  return (
    <div className="items-end flex w-80 max-w-[90vw] bg-zinc-800 rounded min-h-40 border border-white/10 p-5 gap-2 flex-col justify-between">
      <div className="w-full items-center justify-center flex pt-2 pb-2">
        <h2>{title}</h2>
      </div>
      <div className="flex w-full justify-between">
        <button
          className="border border-white/10  rounded-lg py-1.5 px-3 flex gap-1"
          onClick={() => closeDialog(idDialog)}
        >
          Cancelar
        </button>
        <button
          className="border border-white/10  rounded-lg py-1.5 px-3 flex gap-1"
          onClick={() => handlerCheckIn(attendee.id,idDialog)}
        >
          Check-in
        </button>
      </div>
    </div>
  );
}
