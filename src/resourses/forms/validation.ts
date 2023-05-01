import Joi from "joi";

const create = Joi.object({
  link: Joi.string().required(),
  type: Joi.string().required(),
  isPublish: Joi.boolean().required(),
  departingFrom: Joi.string().allow(null),
  finalDestination: Joi.string().allow(null),
  depatureDate: Joi.date().allow(null),
  airline: Joi.string().allow(null),
  flightNumber: Joi.string().allow(null),
  flightDisruption: Joi.string(),
  delayLength: Joi.string().allow(null),
  delayReason: Joi.string().allow(null),
  firstName: Joi.string().allow(null),
  lastName: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  phoneNumber: Joi.string().min(3).max(20).allow(null),
  referenceNumber: Joi.string().allow(null),
  adressLine1: Joi.string().allow(null),
  adressLine2: Joi.string().allow(null),
  city: Joi.string().allow(null),
  postalCode: Joi.string().allow(null),
  state: Joi.string().allow(null),
  country: Joi.string().allow(null),
  assistanceType: Joi.string().allow(null),
  assistanceDetails: Joi.string().allow(null)
});

const updateAdmin = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  type: Joi.string(),
  isPublish: Joi.boolean(),
  departingFrom: Joi.string().allow(null),
  finalDestination: Joi.string().allow(null),
  depatureDate: Joi.date().allow(null),
  airline: Joi.string().allow(null),
  flightNumber: Joi.string().allow(null),
  flightDisruption: Joi.string().allow(null),
  delayLength: Joi.string().allow(null),
  delayReason: Joi.string().allow(null),
  firstName: Joi.string().allow(null),
  lastName: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  phoneNumber: Joi.string().min(3).max(20).allow(null),
  referenceNumber: Joi.string().allow(null),
  adressLine1: Joi.string().allow(null),
  adressLine2: Joi.string().allow(null),
  city: Joi.string().allow(null),
  postalCode: Joi.string().allow(null),
  state: Joi.string().allow(null),
  country: Joi.string().allow(null),
  assistanceType: Joi.string().allow(null),
  assistanceDetails: Joi.string().allow(null)
});

const updateUser = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  departingFrom: Joi.string().allow(null),
  finalDestination: Joi.string().allow(null),
  depatureDate: Joi.date().allow(null),
  airline: Joi.string().allow(null),
  flightNumber: Joi.string().allow(null),
  flightDisruption: Joi.string().allow(null),
  delayLength: Joi.string().allow(null),
  delayReason: Joi.string().allow(null),
  firstName: Joi.string().allow(null),
  lastName: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  phoneNumber: Joi.string().min(3).max(20).allow(null),
  referenceNumber: Joi.string().allow(null),
  adressLine1: Joi.string().allow(null),
  adressLine2: Joi.string().allow(null),
  city: Joi.string().allow(null),
  postalCode: Joi.string().allow(null),
  state: Joi.string().allow(null),
  country: Joi.string().allow(null),
  assistanceType: Joi.string().allow(null),
  assistanceDetails: Joi.string().allow(null)
});

const findAdmin = Joi.object({
  _id: Joi.string().hex().length(24),
  link: Joi.string(),
  type: Joi.string(),
  isPublish: Joi.boolean(),
  departingFrom: Joi.string(),
  finalDestination: Joi.string(),
  depatureDate: Joi.date(),
  airline: Joi.string(),
  flightNumber: Joi.string(),
  flightDisruption: Joi.string(),
  delayLength: Joi.string(),
  delayReason: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(3).max(20),
  referenceNumber: Joi.string(),
  adressLine1: Joi.string(),
  adressLine2: Joi.string(),
  city: Joi.string(),
  postalCode: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  assistanceType: Joi.string(),
  assistanceDetails: Joi.string(),
});

const findUser = Joi.object({
  link: Joi.string().required(),
});

const delete0 = Joi.object({
  _id: Joi.string().hex().length(24).required()
});

export default {
  create,
  updateAdmin,
  updateUser,
  findAdmin,
  findUser,
  delete0
};