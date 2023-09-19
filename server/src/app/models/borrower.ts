import mongoose from "mongoose";
import { Borrower } from "../../utils/types";

const BorrowerSchema = new mongoose.Schema<Borrower>(
  {
    first_name: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    loan_amount: {
      type: Number,
      required: [true, "Loan amount is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "rejected", "approved"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Borrower = mongoose.model<Borrower>("Borrower", BorrowerSchema);

export default Borrower;
