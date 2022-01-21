import { Steps } from "./Steps";

type Package = {
  id: string;
  step: Steps;
  lastUpdate: Date;
  packageNumber: number;
};

export type { Package };
