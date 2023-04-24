import { Router, Request, Response, NextFunction } from "express";

import { Controller } from "../../utils/interfaces";
import HttpException from "../../utils/exception/exception";
import AdminService from "./service";
import validate from "./validation";
import {
  authenticatedMiddleware,
  validationMiddleware,
} from "../../middlewares";
// import IUser from "./interface";
// import Props from "../../utils/cunstomAndProps/props";

class AdminController implements Controller {
  public path = "/user";
  public router = Router();
  private adminService = new AdminService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );

    this.router.post(`${this.path}/logout`, this.logout);

    this.router.get(`${this.path}/refresh`, this.refresh);
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { login, password } = req.body;

      const token = (await this.adminService.login(login, password)) as {
        accessToken: string;
        refreshToken: string;
      };

      res.cookie("refreshToken", token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({data: token});
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { refreshToken } = req.cookies;

      const token = await this.adminService.logout(refreshToken);
      res.clearCookie("refreshToken");

      res.status(201).json(token);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private refresh = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { refreshToken } = req.cookies;

      const token = (await this.adminService.refresh(refreshToken)) as {
        accessToken: string;
        refreshToken: string;
      };
      
      res.cookie("refreshToken", token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({data: token});
    } catch (error: any) {
      await this.logout(req, res, next);
      if (!res.headersSent) {    
        next(new HttpException(401, "Unauthorised"));
      }
    }
  };
}

export default AdminController;