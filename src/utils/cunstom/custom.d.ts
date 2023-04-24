import Admin from "../../resourses/admins/interface";

declare global {
  namespace Express {
    export interface Request {
      admin: Admin;
    }
  }
}