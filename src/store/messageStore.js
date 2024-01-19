import { create } from "zustand";

export const useMessageStore = create((set) => ({
    message: {
        title: '',
        type: '',
        bool: false,
    },
    setMessage: ({title, type}) => set((state) => ({message: {...state.message, title: title, type: type, bool: true}})),
    hideMessage: () => set((state) => ({message: {...state.message, title: '', type: '', bool: false}}))
}))