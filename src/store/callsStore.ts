
import type { Call } from "@types";
import { create } from "zustand";
import callsData from '@data/calls.json'

interface CallsStore {
    isCallsLoading: boolean;
    filteredCalls: Call[];
    calls: Call[];
    setCallsLoading: (value: boolean) => void;
    setFilteredCalls: (calls: Call[]) => void;
}

export const useCallsStore = create<CallsStore>((set) => ({
    isCallsLoading: false,
    calls: callsData as Call[],
    filteredCalls: callsData as Call[],
    setCallsLoading: (value) =>
        set({
            isCallsLoading: value,
        }),

    setFilteredCalls: (filteredCalls: Call[] = []) =>
        set({
            filteredCalls: filteredCalls,
        }),
}));