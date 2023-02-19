import fs from "fs";

import { writeFile } from "fs/promises";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { databaseName } = req.body;

    console.log("databaseName:", databaseName);

    // Update the DATABASE_NAME value in the .env file
    const envFilePath = `${process.cwd()}/.env`;
    const envFileContent = `DATABASE_NAME=${process.env.DATABASE_NAME}\n`;

    try {
      await writeFile(envFilePath, envFileContent, { encoding: "utf-8" });
      console.log(`Updated .env file with DATABASE_NAME=${databaseName}`);
      res.status(200).json({ message: "Database name updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update database name" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
