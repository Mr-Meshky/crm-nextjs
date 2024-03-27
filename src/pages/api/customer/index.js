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
    case "POST":
      upload.single("avatar")(req, res, async (err) => {
        const data = req.body;

        if (!data?.name || !data?.lastName || !data?.email)
          return res
            .status(400)
            .json({ status: "failed", message: "Invalid data" });

        const tempFilePath = req.file.path;
        const targetDirectory = "public/assets/";
        const targetFileName = data.email.split("@")[0] + ".png";
        const targetPath = path.join(targetDirectory, targetFileName);

        fs.rename(tempFilePath, targetPath, async (error) => {
          if (error) {
            return res.status(500).json({ error: "Error moving file" });
          }

          try {
            const newData = {
              ...data,
              avatar: `/assets/${targetFileName}`,
            };
            const customer = await Customer.create(newData);
            return res.status(201).json({
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
      });
      break;
    default:
      res.status(404).json({ status: "notfound", message: "Not found" });
      break;
  }
}
