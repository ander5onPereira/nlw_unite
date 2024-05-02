import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DialogContext from "../context/dialog";
import { writeFile } from "../file/escrever";
import { readFile } from "../file/ler";
import { AttendeeI } from "../interfaces/attendees";
dayjs.extend(relativeTime);
dayjs.locale("pt-br");
export function useAttendees() {
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
  const { removeDialog } = useContext(DialogContext);
  const [total, setTotal] = useState(0);
  const [isLoading] = useState(false);
  const [currentAttendees, setCurrentAttendees] = useState<AttendeeI>({
    id: uuidv4(),
    email: "",
    name: "",
    checkedInAt: null,
    createdAt: dayjs().toString(),
    eventId: "",
  });
  const [listAttendees, setListAttendees] = useState<{
    attendees: AttendeeI[];
    total: number;
  }>();
  const [listAttendeesFilter, setListAttendeesFilter] = useState<{
    attendees: AttendeeI[];
    total: number;
  }>();

  function updateData(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCurrentAttendees((stage: any) => ({
      ...stage,
      [event.target.name]: event.target.value,
    }));
  }
  function filterByName() {
    return listAttendees?.attendees.filter(attendee =>
      attendee.name.toLowerCase().includes(search.toLowerCase())
    );
  }  
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
  function closeDialog(dialogName: string) {
    removeDialog(dialogName);
  }
  function handlerCheckIn(id: string, dialogName: string) {
    const newListAttendees = listAttendees?.attendees.map((attend) => {
      if (attend.id === id) {
        return { ...attend, checkedInAt: dayjs().toString() };
      }
      return attend;
    });
    writeFile("attendees", newListAttendees);
    removeDialog(dialogName);
  }
  function removeAttendees(id: string, dialogName: string) {
    const newListAttendees = listAttendees?.attendees.filter(
      (event: any) => event.id !== id
    );
    writeFile("attendees", newListAttendees);
    removeDialog(dialogName);
  }
  function handlerSave(idDialog: string) {
    const newListAttendees = [
      ...(listAttendees?.attendees || []),
      currentAttendees,
    ];
    writeFile("attendees", newListAttendees);
    setListAttendees({
      attendees: newListAttendees || [],
      total: newListAttendees?.length || 0,
    });
    removeDialog(idDialog);
  }

  function handlerLoading() {
    const attendees = readFile("attendees");
    setListAttendees({
      attendees: attendees || [],
      total: attendees?.length || 0,
    });
    setTotal(attendees?.length || 0);
  }

  useEffect(() => {
    handlerLoading();
  }, []);
  useEffect(()=>{
    const filterList=filterByName()
    setListAttendeesFilter({
      attendees: filterList || [],
      total: filterList?.length || 0,
    });
  },[search])
  return {
    onSearchInputChanged,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    totalPages,
    listAttendees,
    currentAttendees,
    search,
    total,
    page,
    handlerLoading,
    updateData,
    isLoading,
    handlerSave,
    removeAttendees,
    handlerCheckIn,
    closeDialog,
    listAttendeesFilter
  };
}
