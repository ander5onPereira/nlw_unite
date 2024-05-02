import  { useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  
  const Dialog = ({ children }:any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow-lg">
          {children}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeDialog}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  };

  return { Dialog, openDialog, closeDialog };
};

export default useDialog;
