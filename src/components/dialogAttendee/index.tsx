import { useAttendees } from "../../hooks/attendees";
import { useEvents } from "../../hooks/events";

interface DialogAttendeeProps {
  title: string;
  idDialog: string;
}
export function DialogAttendee({ title, idDialog }: DialogAttendeeProps) {
  const { currentAttendees, updateData, handlerSave } = useAttendees();
  const { listEvents } = useEvents();
  const options = listEvents?.events.map((event: any) => {
    return {
      value: event.id,
      label: event.title,
    };
  });

  return (
    <div className="items-end flex w-80 max-w-[90vw] bg-zinc-800 rounded min-h-40 border border-white/10 p-5 gap-2 flex-col">
      <div className="w-full items-center justify-center flex pt-2 pb-2">
        <h2>{title}</h2>
      </div>
      <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
        <input
          onChange={updateData}
          value={currentAttendees.name}
          id="name"
          name="name"
          type="text"
          key="attendeeSearchInput"
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0 w-full"
          placeholder="Nome"
        />
      </div>
      <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
        <input
          onChange={updateData}
          id="email"
          name="email"
          value={currentAttendees.email}
          type="text"
          key="attendeeSearchInput"
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder="Email"
        />
      </div>
      <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
        <select
          onChange={updateData}
          id="eventId"
          name="eventId"
          value={currentAttendees.eventId}
          key="attendeeSearchInput"
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0 bg-zinc-800"
        >
          <option value="">Selecione o evento</option>
          {options?.map((option: any) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="max-w-full justify-end">
        <button
          className="border border-white/10  rounded-lg py-1.5 px-3 flex gap-1"
          onClick={() => handlerSave(idDialog)}
        >
          salvar
        </button>
      </div>
    </div>
  );
}
