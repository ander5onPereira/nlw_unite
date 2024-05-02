import dayjs from "dayjs";
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
import { useEvents } from "../hooks/events";
import useDialog from "../components/dialog";
import { DialogDelete } from "../components/dialogDelete";
import { DialogEvent } from "../components/dialogEvent";
import { IconButton } from "../components/icon-button";
import { FloatingMenuEvent } from "../components/menu/floatingMenuEvent";
import { useMenu } from "../components/menu/useMenu";
import { Table } from "../components/table/table";
import { TableCell } from "../components/table/table-cell";
import { TableHeader } from "../components/table/table-header";
import TableRow from "../components/table/table-row";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function Events() {
  const { Dialog } = useDialog();
  const { displayDialog, removeDialog } = useContext(DialogContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    listEvents,
    isLoading,
    onSearchInputChanged,
    search,
    handlerLoading,
    removeEvent,
    totalPages,
    page,
    goToFirstPage,
    total,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    listEventsFilter,
  } = useEvents();

  const listRender = search.length > 0 ? listEventsFilter : listEvents;
  const { toggleMenu, menuStates } = useMenu(containerRef);

  if (isLoading) {
    return <p>CARREGANDO ...</p>;
  }

  async function handlerClick() {
    displayDialog({
      dialogId: "NEW-EVENT",
      content: <DialogEvent title={"Adicione evento"} idDialog="NEW-EVENT" />,
      onCloseCallback: () => {
        handlerLoading();
      },
    });
  }
  function handlerDelete(id: string) {
    toggleMenu(id);
    displayDialog({
      dialogId: "CONFIRMATION-DEL-EVENT",
      content: (
        <DialogDelete
          title="Apagar Evento"
          removeItem={() => removeEvent(id, "CONFIRMATION-DEL-EVENT")}
          closeDialog={() => removeDialog("CONFIRMATION-DEL-EVENT")}
          idDialog="CONFIRMATION-DEL-EVENT"
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
          <h1 className="text-2xl font-bold">Eventos</h1>
          <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg  flex items-center gap-3">
            <Search className="size-4 text-emerald-300" />
            <input
              onChange={onSearchInputChanged}
              value={search || ""}
              type="text"
              key="attendeeSearchInput"
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
              placeholder="Buscar eventos..."
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
            <TableHeader style={{ width: "calc(100%/3)" }}>Código</TableHeader>
            <TableHeader style={{ width: "calc(100%/3)" }}>Titulo</TableHeader>
            <TableHeader style={{ width: "calc(100%/3)" }}>Detalhe</TableHeader>
            <TableHeader style={{ width: "calc(100%/3)" }}>
              Max. Participantes
            </TableHeader>
            <TableHeader style={{ width: 64 }}>
              <span></span>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {listRender?.events?.map((event: any) => {
            return (
              <TableRow key={event.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-checkbox size-4 bg-black/20 rounded border border-white/10 transition-colors duration-150 ease-in-out text-yellow-600 focus:ring-0"
                  />
                </TableCell>
                <TableCell>{event.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {event.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {event.details}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {event.maximumAttendees}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <IconButton transparent onClick={() => toggleMenu(event.id)}>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                  {menuStates[event.id] && (
                    <FloatingMenuEvent
                      id={event.id}
                      ref={containerRef}
                      onClose={() => handlerDelete(event.id)}
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
              Mostrando {listRender?.events?.length || 0} de {total} itens
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
