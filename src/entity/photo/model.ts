import * as mongoose from "mongoose";

const PHOTO_MODEL_NAME = "Photo";
const PhotoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  { minimize: false },
);

const PhotoModel = mongoose.model(PHOTO_MODEL_NAME, PhotoSchema);
export default PhotoModel;
