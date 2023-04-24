import { Router, Request, Response, NextFunction } from "express";
import Props from "../../utils/props/props";
import { Controller } from "../../utils/interfaces";
import HttpException from "../../utils/exception/exception";
import FormService from "./service";
import validate from "./validation";
import {
  authenticatedMiddleware,
  validationMiddleware,
} from "../../middlewares";

class FormController implements Controller {
  public path = "/form";
  public router = Router();
  private formService = new FormService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(validate.create),
      authenticatedMiddleware,
      this.create
    );

    this.router.put(
      `${this.path}/update`,
      validationMiddleware(validate.updateUser),
      this.updateUser
    );

    this.router.put(
      `${this.path}/admin/update`,
      validationMiddleware(validate.updateAdmin),
      authenticatedMiddleware,
      this.updateAdmin
    );

    this.router.get(
      `${this.path}/find`,
      validationMiddleware(validate.findUser),
      this.findUser
    );

    this.router.get(
      `${this.path}/admin/find`,
      validationMiddleware(validate.findAdmin),
      authenticatedMiddleware,
      this.findAdmin
    );

    this.router.delete(
      `${this.path}/delete`,
      validationMiddleware(validate.delete0),
      authenticatedMiddleware,
      this.delete
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        link,
        type,
        isPublish,
        departingFrom,
        finalDestination,
        depatureDate,
        airline,
        flightNumber,
        flightDisruption,
        delayLength,
        delayReason,
        firstName,
        lastName,
        email,
        phoneNumber,
        referenceNumber,
        adressLine1,
        adressLine2,
        city,
        postalCode,
        state,
        country,
        assistanceType,
        assistanceDetails
      } = req.body;

      const form = await this.formService.create(
          link,
          type,
          isPublish,
          departingFrom,
          finalDestination,
          depatureDate,
          airline,
          flightNumber,
          flightDisruption,
          delayLength,
          delayReason,
          firstName,
          lastName,
          email,
          phoneNumber,
          referenceNumber,
          adressLine1,
          adressLine2,
          city,
          postalCode,
          state,
          country,
          assistanceType,
          assistanceDetails
        )

      res.status(201).json({data: form});
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updateAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        _id,
        type,
        isPublish,
        departingFrom,
        finalDestination,
        depatureDate,
        airline,
        flightNumber,
        flightDisruption,
        delayLength,
        delayReason,
        firstName,
        lastName,
        email,
        phoneNumber,
        referenceNumber,
        adressLine1,
        adressLine2,
        city,
        postalCode,
        state,
        country,
        assistanceType,
        assistanceDetails
      } = req.body;

      const form = await this.formService.updateAdmin(
          _id,
          type,
          isPublish,
          departingFrom,
          finalDestination,
          depatureDate,
          airline,
          flightNumber,
          flightDisruption,
          delayLength,
          delayReason,
          firstName,
          lastName,
          email,
          phoneNumber,
          referenceNumber,
          adressLine1,
          adressLine2,
          city,
          postalCode,
          state,
          country,
          assistanceType,
          assistanceDetails
        )

      res.status(201).json({data: form});
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        _id,
        departingFrom,
        finalDestination,
        depatureDate,
        airline,
        flightNumber,
        flightDisruption,
        delayLength,
        delayReason,
        firstName,
        lastName,
        email,
        phoneNumber,
        referenceNumber,
        adressLine1,
        adressLine2,
        city,
        postalCode,
        state,
        country,
        assistanceType,
        assistanceDetails
      } = req.body;

      const form = await this.formService.updateUser(
          _id,
          departingFrom,
          finalDestination,
          depatureDate,
          airline,
          flightNumber,
          flightDisruption,
          delayLength,
          delayReason,
          firstName,
          lastName,
          email,
          phoneNumber,
          referenceNumber,
          adressLine1,
          adressLine2,
          city,
          postalCode,
          state,
          country,
          assistanceType,
          assistanceDetails
        )

      res.status(201).json({data: form});
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private findAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const props = req.body as Props;
      const forms = await this.formService.findAdmin(props);
      res.status(200).json({ data: forms });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private findUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { link } = req.body;

      const forms = await this.formService.findUser(link);

      res.status(200).json({ data: forms });
    } catch (error: any) {
      next(new HttpException(404, error.message));
    }
  };

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {_id} = req.body;

      const form = await this.formService.delete(_id)

      res.status(201).json({data: form});
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default FormController;