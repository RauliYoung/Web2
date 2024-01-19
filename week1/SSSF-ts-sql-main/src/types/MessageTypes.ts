type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type PostMessage = MessageResponse & {
  id: number;
};

export {MessageResponse, ErrorResponse, PostMessage};
