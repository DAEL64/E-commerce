import { create } from "zustand";

export const useCartHook = create((set) => ({
    isOpen: false,
    onOpen: (id) => set (() => ({isOpen: true})),
    onClose: () => set (() => ({isOpen: false}))
}) )