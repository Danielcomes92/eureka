import { create } from 'zustand';

export const useLocationStore = create(set => ({
  userLocation: null,
  setUserLocation: location => set({ location }),
}));
