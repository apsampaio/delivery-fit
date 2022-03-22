import { Status } from "./Status";

type Package = {
  id: string;
  status: Status;
  updatedAt: Date;
  createdBy: string;
};

export type { Package };
