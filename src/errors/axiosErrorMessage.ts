import axios from "axios";

const axiosErrorMessage = (error: Error): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 400 || error.response?.status === 404)
      return error.response?.data.error;
    if (error.response?.status === 401)
      return "Você não está autorizado para realizar esta ação.";
    if (error.response?.status === 403)
      return "Você não tem permissão para realizar esta ação.";
  }

  return "Ocorreu um erro inesperado.";
};

export { axiosErrorMessage };
