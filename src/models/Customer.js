import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  avatar: {
    type: String,
    default: "/assets/defualt.png",
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    maxLength: 11,
  },
  address: String,
  postalCode: Number,
  date: Date,
  products: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
