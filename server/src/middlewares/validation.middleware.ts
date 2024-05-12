import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";

export default class ValidationMidleware {
  public validation422Rules: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((item) => item.msg)
        .join("\n");

      const response = {
        status: 422,
        message: "Validation Error",
        payload: {
          errorMessage,
          errors: errors.array(),
        },
      };
      return res.status(422).json(response);
    }
    next();
  };
}
