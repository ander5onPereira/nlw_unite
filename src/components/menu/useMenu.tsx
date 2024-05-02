import { useEffect, useState } from "react";
interface MenuStates {
  [key: string]: boolean;
}
export function useMenu(ref: React.RefObject<HTMLDivElement>) {
  const [menuStates, setMenuStates] = useState<MenuStates>({});
  const toggleMenu = (attendeeId: string) => {
    setMenuStates((prevState: any) => ({
      ...prevState,
      [attendeeId]: !prevState[attendeeId] || false,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleMenu(ref.current.id);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggleMenu]);

  return {
    toggleMenu,
    menuStates
  };
}
