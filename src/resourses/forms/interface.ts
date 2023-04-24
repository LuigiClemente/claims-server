import { Document } from "mongoose";

export default interface Form extends Document {
    link: string;
    type: string;
    isPublish: boolean;
    departingFrom: string;
    finalDestination: string;
    depatureDate: Date;
    airline: string;
    flightNumber: string;
    flightDisruption: string;
    delayLength: string;
    delayReason: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    referenceNumber: string;
    adressLine1: string;
    adressLine2: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    assistanceType: string;
    assistanceDetails: string;
}