import { Schema } from "mongoose";

import FormModel from "./model";
import Form from "./interface";
import Props from "../../utils/props/props";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

class FormService {
  private form = FormModel;

  public async create(
    link: string,
    type: string,
    isPublish: boolean,
    departingFrom: string,
    finalDestination: string,
    depatureDate: Date,
    airline: string,
    flightNumber: string,
    flightDisruption: string,
    delayLength: string,
    delayReason: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    referenceNumber: string,
    adressLine1: string,
    adressLine2: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    assistanceType: string,
    assistanceDetails: string
  ): Promise<object | Error> {
    try {
      const data = {
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
        assistanceDetails,
      }

      const form = await this.form.create(data);

      if (!form) {
        throw new Error("Unable to create form");
      }

      const csvWriter = createCsvWriter({
        path: `./src/csv/${form._id}.csv`,
        header: [
          { id: "link", title: "Link" },
          { id: "type", title: "Type" },
          { id: "isPublish", title: "Is Publish" },
          { id: "departingFrom", title: "Departing From" },
          { id: "finalDestination", title: "Final Destination" },
          { id: "depatureDate", title: "Departure Date" },
          { id: "airline", title: "Airline" },
          { id: "flightNumber", title: "Flight Number" },
          { id: "flightDisruption", title: "Flight Disruption" },
          { id: "delayLength", title: "Delay Length" },
          { id: "delayReason", title: "Delay Reason" },
          { id: "firstName", title: "First Name" },
          { id: "lastName", title: "Last Name" },
          { id: "email", title: "Email" },
          { id: "phoneNumber", title: "Phone Number" },
          { id: "referenceNumber", title: "Reference Number" },
          { id: "adressLine1", title: "Address Line 1" },
          { id: "adressLine2", title: "Address Line 2" },
          { id: "city", title: "City" },
          { id: "postalCode", title: "Postal Code" },
          { id: "state", title: "State" },
          { id: "country", title: "Country" },
          { id: "assistanceType", title: "Assistance Type" },
          { id: "assistanceDetails", title: "Assistance Details" },
        ],
      });

      await csvWriter.writeRecords([
        data
      ]);

      return form;
    } catch (error: any) {
      throw new Error("Unable to create form");
    }
  }

  public async updateAdmin(
    _id: Schema.Types.ObjectId,
    type: string,
    isPublish: boolean,
    departingFrom: string,
    finalDestination: string,
    depatureDate: Date,
    airline: string,
    flightNumber: string,
    flightDisruption: string,
    delayLength: string,
    delayReason: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    referenceNumber: string,
    adressLine1: string,
    adressLine2: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    assistanceType: string,
    assistanceDetails: string
  ): Promise<object | Error> {
    try {
      const currenForm = await this.form.findOne({ _id });

      const data = {
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
        assistanceDetails,
      }

      if (!currenForm) {
        throw new Error("Unable to find form with that id");
      }

      const form = await this.form.findByIdAndUpdate(
        _id,
        data,
        { new: true }
      );

      if (!form) {
        throw new Error("Unable to update form");
      }

      const csvWriter = createCsvWriter({
        path: `./src/csv/${form._id}.csv`,
        header: [
          { id: "type", title: "Type" },
          { id: "isPublish", title: "Is Publish" },
          { id: "departingFrom", title: "Departing From" },
          { id: "finalDestination", title: "Final Destination" },
          { id: "depatureDate", title: "Departure Date" },
          { id: "airline", title: "Airline" },
          { id: "flightNumber", title: "Flight Number" },
          { id: "flightDisruption", title: "Flight Disruption" },
          { id: "delayLength", title: "Delay Length" },
          { id: "delayReason", title: "Delay Reason" },
          { id: "firstName", title: "First Name" },
          { id: "lastName", title: "Last Name" },
          { id: "email", title: "Email" },
          { id: "phoneNumber", title: "Phone Number" },
          { id: "referenceNumber", title: "Reference Number" },
          { id: "adressLine1", title: "Address Line 1" },
          { id: "adressLine2", title: "Address Line 2" },
          { id: "city", title: "City" },
          { id: "postalCode", title: "Postal Code" },
          { id: "state", title: "State" },
          { id: "country", title: "Country" },
          { id: "assistanceType", title: "Assistance Type" },
          { id: "assistanceDetails", title: "Assistance Details" },
        ],
      });

      await csvWriter.writeRecords([
        data
      ]);

      return form;
    } catch (error: any) {
      throw new Error("Unable to update form");
    }
  }

  public async updateUser(
    _id: Schema.Types.ObjectId,
    departingFrom: string,
    finalDestination: string,
    depatureDate: Date,
    airline: string,
    flightNumber: string,
    flightDisruption: string,
    delayLength: string,
    delayReason: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    referenceNumber: string,
    adressLine1: string,
    adressLine2: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    assistanceType: string,
    assistanceDetails: string
  ): Promise<object | Error> {
    try {
      const currenForm = await this.form.findOne({ _id });

      const data = {
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
        assistanceDetails,
      }

      if (!currenForm) {
        throw new Error("Unable to find form with that id");
      }

      if (!currenForm.isPublish) {
        throw new Error("Unable to find form with that id");
      }

      const form = await this.form.findByIdAndUpdate(
        _id,
        data,
        { new: true }
      );

      if (!form) {
        throw new Error("Unable to update form");
      }

      if (form.type === "Individual") {
        form.isPublish = false;
        await form.save();
      }

      const csvWriter = createCsvWriter({
        path: `./src/csv/${form._id}.csv`,
        header: [
          { id: "departingFrom", title: "Departing From" },
          { id: "finalDestination", title: "Final Destination" },
          { id: "depatureDate", title: "Departure Date" },
          { id: "airline", title: "Airline" },
          { id: "flightNumber", title: "Flight Number" },
          { id: "flightDisruption", title: "Flight Disruption" },
          { id: "delayLength", title: "Delay Length" },
          { id: "delayReason", title: "Delay Reason" },
          { id: "firstName", title: "First Name" },
          { id: "lastName", title: "Last Name" },
          { id: "email", title: "Email" },
          { id: "phoneNumber", title: "Phone Number" },
          { id: "referenceNumber", title: "Reference Number" },
          { id: "adressLine1", title: "Address Line 1" },
          { id: "adressLine2", title: "Address Line 2" },
          { id: "city", title: "City" },
          { id: "postalCode", title: "Postal Code" },
          { id: "state", title: "State" },
          { id: "country", title: "Country" },
          { id: "assistanceType", title: "Assistance Type" },
          { id: "assistanceDetails", title: "Assistance Details" }
        ],
      });

      await csvWriter.writeRecords([
        data
      ]);

      return form;
    } catch (error: any) {
      throw new Error("Unable to update form");
    }
  }

  public async findAdmin(props: Props): Promise<Form | Array<Form> | Error> {
    try {
      const forms = await this.form.find(props);

      if (!forms) {
        throw new Error(`Unable to find forms with that data`);
      }

      return forms;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findUser(link: string): Promise<Form | Array<Form> | Error> {
    try {
      const forms = await this.form.findOne({
        link,
      });

      if (!forms) {
        throw new Error("Unable to find forms with that data");
      }

      if (!forms.isPublish) {
        throw new Error("Form unpublish");
      }

      return forms;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(_id: Schema.Types.ObjectId): Promise<Form | Error> {
    try {
      const form = await this.form.findByIdAndDelete(_id);

      if (!form) {
        throw new Error("Unable to delete form with that id");
      }

      return form;
    } catch (error) {
      throw new Error("Unable to delete form");
    }
  }
}

export default FormService;
