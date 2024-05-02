import React, { createContext, useState } from "react";
import { displayDialogInterface } from "./types";
import Dialog from "../../components/dialog/generic";

interface Props {
  children: React.ReactNode;
}
const DialogContext = createContext({
  displayDialog: (_props: displayDialogInterface) => {},
  removeDialog: (_dialogId: string) => {},
});

export const externalDialogCall = {
  displayDialog: (_dProps: any) => {},
  removeDialog: (_dialogId: string) => {},
};

export function DialogProvider(props: Props) {
  const { children } = props;
  const [dialogs, setDialogs] = useState<any>([]);

  function displayDialog(dProps: displayDialogInterface) {
    const dialogExists: displayDialogInterface = dialogs.find(
      (dialog: displayDialogInterface) => dialog.dialogId === dProps.dialogId
    );
    if (dialogExists) {
      setDialogs((current: any) => [
        ...[...current].filter(
          (dialog: displayDialogInterface) =>
            dialog.dialogId !== dProps.dialogId
        ),
        { ...dProps },
      ]);
    } else {
      setDialogs((current: any) => [...current, { ...dProps }]);
    }
  }
  function removeDialog(dialogId: string) {
    setDialogs((currentDialogs: any) => {
      const dialogToRemove: displayDialogInterface = currentDialogs.find(
        (dialog: displayDialogInterface) => dialog.dialogId === dialogId
      );
      if (dialogToRemove) {
        if (dialogToRemove?.onCloseCallback) {
          dialogToRemove.onCloseCallback();
        }
        if (dialogToRemove?.dialogProps?.onClose) {
          dialogToRemove?.dialogProps?.onClose();
        }
      }
      return currentDialogs.filter(
        (dialog: displayDialogInterface) => dialog.dialogId !== dialogId
      );
    });
  }

  externalDialogCall.displayDialog = displayDialog;
  externalDialogCall.removeDialog = removeDialog;

  return (
    <DialogContext.Provider
      value={{
        displayDialog,
        removeDialog,
      }}
    >
      {children}
      {dialogs?.map((dialog: displayDialogInterface) => {
        return (
          <Dialog
            key={dialog.dialogId}
            {...dialog?.dialogProps}
            onClose={() => removeDialog(dialog.dialogId)}
            displayClose
          >
            {dialog.content}
          </Dialog>
        );
      })}
    </DialogContext.Provider>
  );
}

export default DialogContext;
