import { Schema, model } from "mongoose";
import Token from "./interface";

const TokenSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      default: false,
      ref: "Admins"
    },
    refreshToken: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default model<Token>("Tokens", TokenSchema);