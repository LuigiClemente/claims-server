import { Schema, model } from "mongoose";

import Form from "./interface";

const FormSchema = new Schema(
  {
    link: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    departingFrom: {
      type: String,
    },
    finalDestination: {
      type: String,
    },
    depatureDate: {
      type: Date,
    },
    airline: {
      type: String,
    },
    flightNumber: {
      type: String,
    },
    flightDisruption: {
      type: String,
    },
    delayLength: {
      type: String,
    },
    delayReason: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    referenceNumber: {
      type: String,
    },
    adressLine1: {
      type: String,
    },
    adressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    assistanceType: {
      type: String,
    },
    assistanceDetails: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default model<Form>("Forms", FormSchema);