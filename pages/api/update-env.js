import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { database_name } = req.body;
    const envFilePath = `${process.cwd()}/.env`;
    const updatedEnvContent = fs
      .readFileSync(envFilePath, "utf8")
      .replace(/DATABASE_NAME=.*/, `DATABASE_NAME=${database_name}`);
    fs.writeFileSync(envFilePath, updatedEnvContent);

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
