
import { ReactNode } from 'react'

export interface DialogInterface {
    children?: any;
    onClose?: (() => void) | Function | null;
    displayClose?: boolean;
    disableOverlayClose?: boolean;
}

export interface displayDialogInterface {
    dialogId: string,
    content: ReactNode;
    onCloseCallback?: Function;
    close?: boolean;
    dialogProps?: DialogInterface;
}
