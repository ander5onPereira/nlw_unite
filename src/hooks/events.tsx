import { ChangeEvent, useContext, useEffect, useState } from "react";
import { readFile } from "../file/ler";
import { writeFile } from "../file/escrever";
import DialogContext from "../context/dialog";
import { EventI, ListEventI, defaultEvent } from "../interfaces/events";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE="events"
export function useEvents() {
  const [search, setSearch] = useState<string>(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
    return "";
  });
  const [page, setPage] = useState<number>(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });
  const [total, setTotal] = useState(0);
  const [isLoading] = useState(false);
  const [listEvents, setListEvents] = useState<ListEventI>();
  const [listEventsFilter, setListEventsFilter] = useState<ListEventI>();
  const { removeDialog } = useContext(DialogContext);
  const [currentEvent, setCurrentEvent] = useState<EventI>(defaultEvent);
  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", String(search));
    window.history.pushState({}, "", url);
    setSearch(search);
  }
  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  }

  const totalPages = Math.ceil(total / 10);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }
  function goToNextPage() {
    setCurrentPage(page + 1);
  }
  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }
  function goToFirstPage() {
    setCurrentPage(1);
  }
  function goToLastPage() {
    setCurrentPage(totalPages);
  }
  function updateData(event: ChangeEvent<HTMLInputElement>) {
    setCurrentEvent((stage) => ({
      ...stage,
      [event.target.name]: event.target.value,
    }));
  }
  function removeEvent(id:string,dialogName:string){
    const newListEvent = listEvents?.events.filter((event:any) => event.id !== id);
    writeFile(LOCAL_STORAGE, newListEvent);
    removeDialog(dialogName);

  }
  function handlerSave(idDialog:string) {
    const newListEvent = [...(listEvents?.events || []), {...currentEvent,id:uuidv4()}];
    writeFile(LOCAL_STORAGE, newListEvent);
    setCurrentEvent(defaultEvent)
    setListEvents({
      events: newListEvent || [],
      total: newListEvent?.length || 0,
    });
    removeDialog(idDialog);
  }
  function handlerLoading(){
    const events = readFile(LOCAL_STORAGE);
    setListEvents({ events: events || [], total: events?.length || 0 });
    setTotal(events?.length || 0)
  }
  function filterByTitle() {
    return listEvents?.events.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    handlerLoading()
  }, []);
  useEffect(()=>{
    const filterList=filterByTitle()
    setListEventsFilter({
      events: filterList || [],
      total: filterList?.length || 0,
    });
  },[search])
  return {
    currentEvent,
    updateData,
    listEvents,
    handlerSave,
    totalPages,
    isLoading,
    onSearchInputChanged,
    search,
    handlerLoading,
    removeEvent,
    page,
    goToFirstPage,
    total,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    listEventsFilter
  };
}
