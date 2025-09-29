import { create } from "zustand";

export const useMenuHook = create((set) => ({
    isOpen: false,
    onOpen: (id) => set (() => ({isOpen: true})),
    onClose: () => set (() => ({isOpen: false}))
}) )