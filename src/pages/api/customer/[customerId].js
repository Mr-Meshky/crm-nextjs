import Customer from "@/models/Customer";
import { connectDB } from "@/utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  switch (req.method) {
    case "GET":
      const id = req.query.customerId;
      try {
        const customer = await Customer.findById(id);
        res.status(200).json({ status: "success", data: customer });
      } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "Error in retriveing data from database",
        });
      }
      break;

    default:
      res.status(404).json({ status: "notfound", message: "Not found" });
      break;
  }
}
