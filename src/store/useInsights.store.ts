import { create } from "zustand";

type Insight = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type InsightsStore = {
  insights: Insight[];
  setInsights: (insights: Insight[]) => void;
};

const useInsights = create<InsightsStore>((set) => ({
  insights: [],
  setInsights: (insights: Insight[]) => set({ insights }),
}));

export default useInsights;
