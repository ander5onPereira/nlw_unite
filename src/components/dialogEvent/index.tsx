import { useEvents } from "../../hooks/events";

interface DialogEventProps {
  title: string;
  idDialog: string;
}
export function DialogEvent({ title,idDialog }: DialogEventProps) {
  const { currentEvent, updateData, handlerSave } = useEvents();

  return (
    <div className="items-end flex w-80 max-w-[90vw] bg-zinc-800 rounded min-h-40 border border-white/10 p-5 gap-2 flex-col">
      <div className="w-full items-center justify-center flex pt-2 pb-2">
        <h2>{title}</h2>
      </div>
      <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
        <input
          onChange={updateData}
          value={currentEvent.title}
          id="title"
          name="title"
          type="text"
          key="attendeeSearchInput"
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0 w-full"
          placeholder="Titulo"
        />
      </div>
      <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
        <input
          onChange={updateData}
          id="details"
          name="details"
          value={currentEvent.details}
          type="text"
          key="attendeeSearchInput"
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder="Detalhes"
        />
      </div>
      <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
        <input
          onChange={(event) => {
            updateData(event);
          }}
          value={currentEvent.maximumAttendees}
          type="number"
          name="maximumAttendees"
          id="maximumAttendees"
          key="attendeeSearchInput"
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder="Max. participantes"
        />
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
