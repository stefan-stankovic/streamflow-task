export type ApiError = {
  response?: {
    data?: {
      detail?: string;
      code?: string;
    };
  };
};
