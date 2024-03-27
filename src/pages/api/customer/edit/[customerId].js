import multer from "multer";
import fs from "fs";
import path from "path";

import Customer from "@/models/Customer";
import { connectDB } from "@/utils/connectDB";

const upload = multer({ dest: "public/assets/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  switch (req.method) {
    case "PATCH":
      const id = req.query.customerId;
      upload.single("avatar")(req, res, async (err) => {
        const data = req.body;

        if (!data?.name || !data?.lastName || !data?.email)
          return res
            .status(400)
            .json({ status: "failed", message: "Invalid data" });

        let targetFileName = false;
        if (!data.avatar) {
          const tempFilePath = req.file.path;
          const targetDirectory = "public/assets/";
          targetFileName = data.email.split("@")[0] + ".png";
          const targetPath = path.join(targetDirectory, targetFileName);

          fs.rename(tempFilePath, targetPath, async (error) => {
            if (error) {
              return res.status(500).json({ error: "Error moving file" });
            }
          });
        }

        try {
          const customer = await Customer.findOne({ _id: id });
          customer.name = data.name;
          customer.lastName = data.lastName;
          customer.email = data.email;
          customer.avatar = targetFileName
            ? `/assets/${targetFileName}`
            : customer.avatar;
          customer.phone = data.phone;
          customer.address = data.address;
          customer.postalCode = data.postalCode;
          customer.date = data.date;
          customer.products = data.products;
          customer.updateAt = () => Date.now();
          await customer.save();
          res.status(201).json({
            status: "success",
            message: "Data created",
            data: customer,
          });
        } catch (error) {
          return res.status(500).json({
            status: "failed",
            message: "Error in storing data in DB",
          });
        }
      });
      break;
    default:
      res.status(404).json({ status: "notfound", message: "Not found" });
      break;
  }
}
