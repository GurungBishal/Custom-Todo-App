import { Response } from "express";

export const successHandler = (
  res: Response,
  status: number,
  message: string,
  payload: Record<string, unknown>
) => {
  const response = {
    message,
    status,
    payload,
  };

  return res.status(status).json(response);
};
