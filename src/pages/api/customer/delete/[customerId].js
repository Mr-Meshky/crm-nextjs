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
  const id = req.query.customerId;
   switch (req.method) {
    case "DELETE":
      try {
        await Customer.deleteOne({ _id: id });
        res.status(200).json({ status: "success", message: "Data deleted" });
      } catch (error) {
        return res.status(500).json({
          status: "failed",
          message: "Error in storing data in DB",
        });
      }
      break;

    default:
      break;
  }
}
