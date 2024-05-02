import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useContext, useRef } from "react";
import DialogContext from "../context/dialog";
import { useAttendees } from "../hooks/attendees";
import useDialog from "../components/dialog";
import { DialogAttendee } from "../components/dialogAttendee";
import { DialogCheckIn } from "../components/dialogCheckIn";
import { IconButton } from "../components/icon-button";
import { FloatingMenu } from "../components/menu/floatingMenu";
import { Table } from "../components/table/table";
import { TableCell } from "../components/table/table-cell";
import { TableHeader } from "../components/table/table-header";
import TableRow from "../components/table/table-row";
import { DialogDelete } from "../components/dialogDelete";
import { useMenu } from "../components/menu/useMenu";
import { AttendeeI } from "../interfaces/attendees";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function Attendee() {
  const { Dialog } = useDialog();
  const { displayDialog, removeDialog } = useContext(DialogContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toggleMenu, menuStates } = useMenu(containerRef);
  const {
    onSearchInputChanged,
    search,
    total,
    page,
    totalPages,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    listAttendees,
    isLoading,
    handlerLoading,
    removeAttendees,
    listAttendeesFilter
  } = useAttendees();

  const listRender = search.length>0?listAttendeesFilter:listAttendees
  if (isLoading) {
    return <p>CARREGANDO ...</p>;
  }
  function handlerCheckIn(attendee: AttendeeI) {
    toggleMenu(attendee.id);
    displayDialog({
      dialogId: "CONFIRM-CHECKIN",
      content: (
        <DialogCheckIn
          title="Confimar check-in"
          idDialog="CONFIRM-CHECKIN"
          attendee={attendee}
        />
      ),
      onCloseCallback: () => {
        handlerLoading();
      },
    });
  }
  function handlerDelete(id: string) {
    toggleMenu(id);
    displayDialog({
      dialogId: "CONFIRMATION-DEL-ATTENDEE",
      content: (
        <DialogDelete
          title="Apagar Participante"
          removeItem={() => removeAttendees(id, "CONFIRMATION-DEL-ATTENDEE")}
          closeDialog={() => removeDialog("CONFIRMATION-DEL-ATTENDEE")}
          idDialog="CONFIRMATION-DEL-EVENT"
        />
      ),
      onCloseCallback: () => {
        handlerLoading();
      },
    });
  }
  async function handlerClick() {
    displayDialog({
      dialogId: "NEW-ATTENDEE",
      content: (
        <DialogAttendee
          title={"Adicione participante"}
          idDialog="NEW-ATTENDEE"
        />
      ),
      onCloseCallback: () => {
        handlerLoading();
      },
    });
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3">
          <h1 className="text-2xl font-bold">Participantes</h1>
          <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
            <Search className="size-4 text-emerald-300" />
            <input
              onChange={onSearchInputChanged}
              value={search || ""}
              type="text"
              key="attendeeSearchInput"
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
              placeholder="Buscar participante..."
            />
          </div>
        </div>
        <div className="max-w-full">
          <button
            className="border border-white/10  rounded-lg py-1.5 px-3 flex gap-1"
            onClick={() => handlerClick()}
          >
            <Plus />
            Add
          </button>
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 64 }}>
              <input
                type="checkbox"
                id="checkbox"
                className="form-checkbox size-4 bg-black/20 rounded border border-white/10 transition-colors duration-150 ease-in-out text-yellow-600 focus:ring-0 "
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {listRender?.attendees?.map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-checkbox size-4 bg-black/20 rounded border border-white/10 transition-colors duration-150 ease-in-out text-yellow-600 focus:ring-0"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null ? (
                    <span className="text-zinc-400">Não fez check-in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
                </TableCell>
                <TableCell className="relative">
                  <IconButton
                    transparent
                    onClick={() => toggleMenu(attendee.id)}
                  >
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                  {menuStates[attendee.id] && (
                    <FloatingMenu
                      ref={containerRef}
                      id={attendee.id}
                      onCheckIn={() => handlerCheckIn(attendee)}
                      attendee={attendee}
                      onClose={() => handlerDelete(attendee.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {listRender?.attendees?.length || 0} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  pagina {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
      <Dialog>
        <h2 className="text-lg font-bold mb-4">Título do Diálogo</h2>
        <p>Conteúdo do diálogo...</p>
      </Dialog>
    </div>
  );
}
