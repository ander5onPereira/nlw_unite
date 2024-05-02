interface DialogDeleteProps {
  title: string;
  idDialog: string;
  closeDialog: Function;
  removeItem: () => void;
}
export function DialogDelete({
  title,
  idDialog,
  removeItem,
  closeDialog,
}: DialogDeleteProps) {
  return (
    <div className="w-80 max-w-[90vw] h-full bg-zinc-800 rounded min-h-40 border flex border-white/10 p-5 justify-between flex-col">
      <div className="w-full h-full flex justify-center items-center">
        <h1>{title}</h1>
      </div>
      <div className="flex w-full justify-between">
        <button
          className="border border-white/10  rounded-lg py-1.5 px-3 flex gap-1"
          onClick={() => closeDialog(idDialog)}
        >
          Cancelar
        </button>
        <button
          onClick={removeItem}
          className="border border-white/10  rounded-lg py-1.5 px-3 flex gap-1 bg-white/10"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
