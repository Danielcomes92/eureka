import { create } from 'zustand';

export const useImagesStore = create(set => ({
  images: [],
  setNewImage: newImage =>
    set(state => ({
      images: [{ newImage }, ...state.images],
    })),
  setImagesFromLibrary: images => set({ images }),
  removeImage: imageId =>
    set(state => ({
      images: state.images.filter(img => img.id !== imageId),
    })),
}));
