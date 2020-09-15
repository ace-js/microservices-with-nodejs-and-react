import { body } from "express-validator";

export default [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("price").not().isEmpty().withMessage("Price is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
];
