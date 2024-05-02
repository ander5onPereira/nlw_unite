import { X } from "lucide-react";
import { useEffect } from "react";
export interface DialogInterface {
  children?: any;
  onClose?: (() => void) | Function | null;
  displayClose?: boolean;
  disableOverlayClose?: boolean;
}

let mouseDown: any = null;
export default function Dialog({
  children,
  onClose,
  displayClose,
  disableOverlayClose,
}: DialogInterface) {
  function close() {
    if (onClose) onClose();
  }
  async function overClickClose(e: any) {
    if (e?.target === e?.currentTarget && e?.target === mouseDown?.target) {
      close();
    }
  }
  function keyHandler(e: KeyboardEvent) {
    if (e.key === "Escape" && onClose && !disableOverlayClose) {
      onClose();
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", (e) => keyHandler(e));
  }, []);

  return (
    <div
      tabIndex={-1}
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 backdrop-blur-10 flex justify-center items-center z-50"
      onClick={(e) => {
        if (!disableOverlayClose) overClickClose(e);
      }}
      onMouseDown={(e) => {
        mouseDown = e;
      }}
    >
      <div className="max-w-screen w-auto h-auto max-h-screen overflow-y-auto relative overflow-x-hidden">
        {displayClose && (
          <div className="absolute right-1 top-1 cursor-pointer z-50">
            <X onClick={() => close()} className="text-cyan-50" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
