import { Document } from "mongoose";

export default interface Admin extends Document {
  login: string;
  password: string;

  // getUpdate(): Promise<Error | Object>;
  // setUpdate(obj: Object): Promise<Error | boolean>;
  isValidPassword(passwod: string): Promise<Error | boolean>;
}