import { useLocation } from "react-router-dom";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";
export function Header() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex items-center gap-5 py-2">
      <a href="/">
        <img src={nlwUniteIcon} alt="logo-unite" />
      </a>
      <nav className="flex items-center gap-5">
        <NavLink href="/events" isSelect={path === "/events"}>
          Eventos
        </NavLink>
        <NavLink href="/participantes" isSelect={path === "/participantes"}>
          Paticipantes
        </NavLink>
      </nav>
    </div>
  );
}
