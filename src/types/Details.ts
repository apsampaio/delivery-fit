import { Package } from "./Package";

type Details = {
  id: string;
  recipient: string;
  zipcode: string;
  houseNumber: string;
  postedAt: Date | null;
  withdrawnAt: Date | null;
  deliveredAt: Date | null;
  packageId: string;
  package: Package;
};

export type { Details };
