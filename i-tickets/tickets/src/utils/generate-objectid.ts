import mongoose from "mongoose";

export const generateObjectId = (): string =>
  new mongoose.Types.ObjectId().toHexString();
