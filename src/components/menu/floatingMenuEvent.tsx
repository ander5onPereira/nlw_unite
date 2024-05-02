import { CookingPot } from "lucide-react";
import { forwardRef } from "react";

interface FloatingMenuEventProps {
  onClose: () => void;
  id: string;
}
export const FloatingMenuEvent = forwardRef<
  HTMLDivElement,
  FloatingMenuEventProps
>(({ onClose, id }: FloatingMenuEventProps, ref) => {
  return (
    <div
      ref={ref}
      id={id}
      className="absolute right-4 mt-0.5 w-24 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10"
    >
      <ul className="py-2">
        <li
          className="px-2 py-2 cursor-pointer hover:bg-zinc-700 flex items-center gap-1"
          onClick={onClose}
        >
          <CookingPot size={16} />
          Delete
        </li>
      </ul>
    </div>
  );
});
