import { Header } from "./components/header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5 h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
