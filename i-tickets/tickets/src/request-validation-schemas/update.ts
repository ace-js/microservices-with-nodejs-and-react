import { body, param } from "express-validator";

export default [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("price").not().isEmpty().withMessage("Price is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  param("id").not().isEmpty().withMessage("Id is required"),
  param("id").isMongoId().withMessage("Id must be an ObjectID"),
];
