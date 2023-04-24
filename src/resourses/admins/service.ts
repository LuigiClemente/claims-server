import { Schema } from "mongoose";

import jwt from "jsonwebtoken";
import { TokenObject } from "../../utils/interfaces";
import AdminModel from "./model";
import Admin from "./interface";
import Props from "../../utils/props/props";
import TokenService from "../tokens/service";
import TokenModel from "../tokens/model";
import {validateToken} from "../../utils/validate";

class AdminService {
  private admin = AdminModel;
  private token = TokenModel;
  private tokenService = new TokenService();

  private async saveToken(tokens: Props, admin: Admin): Promise<any> {
    try {
      tokens
        .then(async (data: Props) => {
          await this.tokenService.saveToken(admin.id, data.refreshToken);
        })
        .catch((error: any) => {
          throw new Error("Unforeseeable error");
        });
    } catch (error) {
      throw new Error("Unable to find admins");
    }
  }

  public async login(login: string, password: string): Promise<object | Error> {
    try {
      let admin = await this.admin.findOne({ login });

      if (!admin && login === process.env.login) {
        admin = await this.admin.create({login: login, password: password});
      }

      if (!admin) {
        throw new Error("Unable to find admin account with that email address");
      }

      if (await admin.isValidPassword(password)) {
        const tokens = this.tokenService.generateTokens(admin);

        this.saveToken(tokens, admin);

        return tokens;
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error: any) {
      throw new Error("Unable to login admin account");
    }
  }

  public async logout(refreshToken: string): Promise<object | Error> {
    try {
      const token = this.tokenService.removeToken(refreshToken);

      return token;
    } catch (error: any) {
      throw new Error("Unable to delete admin token");
    }
  }

  public async refresh(refreshToken: string): Promise<object | Error> {
    try {
      if (!refreshToken) {
        throw new Error("Admin is not logged in");
      }

      const adminData: TokenObject | jwt.JsonWebTokenError =
        await validateToken.validateRefreshToken(refreshToken);
      const tokenFromDB = await this.tokenService.findToken(refreshToken);

      if (!adminData || !tokenFromDB) {
        throw new Error("Admin is not logged in");
      }

      const token = await this.token.findOne({ refreshToken });

      if (!token) {
        throw new Error("Admin is not logged in");
      }

      const admin = await this.admin.findById(token.adminId);

      if (!admin) {
        throw new Error("Admin is not logged in");
      }

      const tokens = this.tokenService.generateTokens(admin);

      this.saveToken(tokens, admin);

      return tokens;
    } catch (error: any) {
      throw new Error("Unable to refresh admin token");
    }
  }

  // public async updatePassword(
  //   _id: Schema.Types.ObjectId,
  //   new_password: string,
  //   password: string
  // ): Promise<Admin | Error> {
  //   try {
  //     const account = await this.admin.findOne({ _id });

  //     if (!account) {
  //       throw new Error("Unable to find account with that id");
  //     }

  //     if (await account.isValidPassword(password)) {
  //       const admin = await this.admin.findByIdAndUpdate(
  //         _id,
  //         { password: new_password },
  //         { new: true }
  //       );

  //       if (!admin) {
  //         throw new Error("Unable to update admin account with that id");
  //       }

  //       return admin;
  //     } else {
  //       throw new Error("Wrong credentials given");
  //     }
  //   } catch (error) {
  //     throw new Error("The old password does not match the entered one");
  //   }
  // }
}

export default AdminService;