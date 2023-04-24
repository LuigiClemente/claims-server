import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import HttpException from "../utils/exception/exception";
import {validateToken} from "../utils/validate";
import AdminModel from "../resourses/admins/model";
import { TokenObject } from "../utils/interfaces";

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, "Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();

  if (!accessToken) {
    return next(new HttpException(401, "Unauthorised"));
  }

  try {
    const payload: TokenObject | jwt.JsonWebTokenError =
      await validateToken.validateAccessToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised"));
    }

    const admin = await AdminModel.findById(payload.id)
      .select("-password")
      .exec();

    if (!admin) {
      return next(new HttpException(401, "Unauthorised"));
    }

    req.admin = admin;

    return next();
  } catch (error) {
    return next(new HttpException(401, "Unauthorised"));
  }
}

export default authenticatedMiddleware;