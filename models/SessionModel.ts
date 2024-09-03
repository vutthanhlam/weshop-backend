import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: String!,
      require: true,
    },
  },
  { timestamps: true }
);

const SessionModel = mongoose.model("sessions", sessionSchema);
export default SessionModel;
