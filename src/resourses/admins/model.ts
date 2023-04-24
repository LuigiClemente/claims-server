import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import Admin from "./interface";
import TokenModel from "../tokens/model"

const AdminSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

AdminSchema.pre<Admin>('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
  }
  next();
});

AdminSchema.post("findOneAndDelete", async function (result, next) {
  await TokenModel.deleteMany({ adminId: result._id });
  next();
});

export default model<Admin>("Admins", AdminSchema);