import { Status } from "./Status";

type Package = {
  id: string;
  status: Status;
  updatedAt: Date;
};

export type { Package };
