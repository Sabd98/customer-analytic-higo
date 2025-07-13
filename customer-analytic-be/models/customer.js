const mongoose = require("mongoose");
// Customer schema for Customer Collection
const customerSchema = new mongoose.Schema(
  {
    number: Number,
    locationName: String,
    date: Date,
    loginHour: String,
    name: String,
    age: Number,
    gender: String,
    email: String,
    phone: String,
    brand: String,
    interest: String,
    locationType: String,
  },
  {
    timestamps: false,
    collection: "customers",
  }
);

// Indexes for faster queries
customerSchema.index({ brand: 1 });
customerSchema.index({ gender: 1 });
customerSchema.index({ locationType: 1 });
customerSchema.index({ interest: 1 });

module.exports = mongoose.model("Customer", customerSchema);
