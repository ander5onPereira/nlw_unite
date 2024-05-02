import { useLocation } from "react-router-dom";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";
export function Header() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex items-center gap-5 py-2">
      <a href="/nlw_unite">
        <img src={nlwUniteIcon} alt="logo-unite" />
      </a>
      <nav className="flex items-center gap-5">
        <NavLink href="/nlw_unite/events" isSelect={path === "/nlw_unite/events"}>
          Eventos
        </NavLink>
        <NavLink href="/nlw_unite/participantes" isSelect={path === "/nlw_unite/participantes"}>
          Paticipantes
        </NavLink>
      </nav>
    </div>
  );
}
