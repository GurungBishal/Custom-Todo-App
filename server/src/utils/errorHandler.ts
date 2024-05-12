import { Response } from "express";

export const errorHandler = (
  res: Response,
  status: number,
  message: string,
  payload: Record<string, unknown>
) => {
  const response = {
    status,
    message,
    payload,
  };
  return res.status(status).json(response);
};
