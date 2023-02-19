// pages/api/update-env.js

import { readFile, writeFile } from "fs/promises";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { database_name } = req.body;

    console.log("database_name:", database_name);

    // Read the current contents of the .env file
    const envFilePath = `${process.cwd()}/.env`;
    const envFileContent = await readFile(envFilePath, { encoding: "utf-8" });

    // Replace the value of the DATABASE_NAME variable
    const updatedEnvFileContent = envFileContent.replace(
      /DATABASE_NAME=.*/,
      `DATABASE_NAME=${database_name}`
    );

    // Write the updated contents to the .env file
    try {
      await writeFile(envFilePath, updatedEnvFileContent, {
        encoding: "utf-8",
      });
      console.log(`Updated .env file with DATABASE_NAME=${database_name}`);
      res.status(200).json({ message: "Database name updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update database name" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
