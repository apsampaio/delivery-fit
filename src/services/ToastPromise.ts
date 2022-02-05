import { toast } from "react-toastify";
import { axiosErrorMessage } from "../errors/axiosErrorMessage";

type ToastProps = {
  action: () => Promise<any>;
  pending?: string;
  success?: string;
};

class ToastPromise {
  constructor() {}

  private readonly pending = "Realizando ação...";
  private readonly success = "Ação realizada com sucesso!";

  async run({ action, pending, success }: ToastProps) {
    await toast.promise(action, {
      pending: pending || this.pending,
      success: success || this.success,
      error: {
        render({ data }) {
          return axiosErrorMessage(data as Error);
        },
      },
    });
  }
}

export { ToastPromise };
