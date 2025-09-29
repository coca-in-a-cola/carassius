export type MessageResponse = {
  message: string;
};

export type ErrorResponse = {
  stack?: string;
} & MessageResponse;
