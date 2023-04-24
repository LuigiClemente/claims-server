import { Schema } from "mongoose";

interface Token extends Object {
  adminId: Schema.Types.ObjectId;
  refreshToken: string;
}

export default Token;