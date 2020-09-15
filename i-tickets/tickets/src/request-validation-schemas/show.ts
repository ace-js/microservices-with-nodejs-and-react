import { body, param } from "express-validator";

export default [
  param("id").not().isEmpty().withMessage("Id is required"),
  param("id").isMongoId().withMessage("Id must be an ObjectID"),
];
