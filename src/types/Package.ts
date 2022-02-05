import { Status } from "./Status";

type Package = {
  id: string;
  status: Status;
  updatedAt: Date;
  user: {
    name: string;
  };
};

export type { Package };
