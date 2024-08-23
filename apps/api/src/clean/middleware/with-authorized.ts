import type { DefaultResponse } from "@repo/models";
import type { NextFunction, Request, Response } from "express";

export default function withAuthorized(
  req: Request,
  res: Response<DefaultResponse<void>>,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      errorMessage: "You must be authenticated to perform this action",
    });
  }
  next();
}
