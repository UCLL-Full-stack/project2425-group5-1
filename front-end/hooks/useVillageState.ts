import { Vector2D } from "@/types";
import { create } from "zustand";

interface VillageState {
  merchantPos: Vector2D;
  setMerchantPos: (x: number, y: number) => void;
}

const useVillageState = create<VillageState>()((set) => ({
  merchantPos: [0, 0],
  setMerchantPos: async (x, y) => {
    set((prev) => ({ merchantPos: [x, y] }));
  },
}));
