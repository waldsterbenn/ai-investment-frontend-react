const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const { ServerConfig } = require("./config/server_config.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); //Middleware to parse json

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "Pong" });
});

app.get("/api/portfolio", (req, res) => {
  const jsonData = readData();
  res.json(jsonData);
  console.debug(`fetched ${jsonData.portfolio.length} items`);
});

function readData() {
  const filePath = path.join(__dirname, "data/portfolio.json");
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

app.post("/api/save-report", async (req, res) => {
  console.debug("/api/save-report");
  const jsn = JSON.parse(req.body);
  const outputFilePath = path.join(
    __dirname,
    `../../ai-investment-manager/data/${jsn.filename}`
  );
  fs.writeFileSync(outputFilePath, jsn.reportData, "utf-8");
});

function loadFauxReport() {
  const filePath = path.join(__dirname, "data/test.md");
  const report = fs.readFileSync(filePath, "utf-8");
  return report;
  // console.warn(report);
  // res.json({ success: true, report });
  // return;
}

app.post("/api/run-technical-analysis", async (req, res) => {
  console.debug("/api/run-technical-analysis > script caller triggered");

  // Path to your Python script, could be absolute
  const pythonScriptPath = path.join(
    __dirname,
    "../../ai-investment-manager/single_advice_technical.py"
  );

  // Serialize the JSON object to a string
  const jsonDataString = JSON.stringify(req.body, null, 0).replace(/"/g, "'");

  // Spawn the Python script with the JSON data as an argument
  const childProcess = spawn(ServerConfig.conda_exe_path, [
    "run",
    "-p",
    ServerConfig.conda_env_path,
    "python",
    pythonScriptPath,
    jsonDataString,
  ]);

  let output = "";
  let error = "";

  // Capture stdout data from the script
  childProcess.stdout.on("data", (data) => {
    output += data.toString();
    console.debug("script out: " + output);
  });

  // Capture stderr data from the script
  childProcess.stderr.on("data", (err) => {
    error += err.toString();
    console.debug("script err: " + error);
  });

  // Handle when the script completes
  childProcess.on("close", (code) => {
    if (code === 0) {
      console.debug("script sucess");
      const report = output.split("TECHREPORT:")[1];
      res.json({ success: true, report });
    } else {
      console.debug("script failed", error);
      res.status(500).json({ success: false, error });
    }
  });
});

app.post("/api/run-financial-analysis", async (req, res) => {
  console.debug("/api/run-financial-analysis > script caller triggered");

  // Path to your Python script, could be absolute
  const pythonScriptPath = path.join(
    __dirname,
    "../../ai-investment-manager/single_advice_fincancial.py"
  );

  // Serialize the JSON object to a string
  const jsonDataString = JSON.stringify(req.body, null, 0).replace(/"/g, "'");

  // Spawn the Python script with the JSON data as an argument
  const childProcess = spawn(ServerConfig.conda_exe_path, [
    "run",
    "-p",
    ServerConfig.conda_env_path,
    "python",
    pythonScriptPath,
    jsonDataString,
  ]);

  let output = "";
  let error = "";

  // Capture stdout data from the script
  childProcess.stdout.on("data", (data) => {
    output += data.toString();
    console.debug("script out: " + output);
  });

  // Capture stderr data from the script
  childProcess.stderr.on("data", (err) => {
    error += err.toString();
    console.debug("script err: " + error);
  });

  // Handle when the script completes
  childProcess.on("close", (code) => {
    if (code === 0) {
      console.debug("script sucess");
      const report = output.split("FINREPORT:")[1];
      res.json({ success: true, report });
    } else {
      console.debug("script failed", error);
      res.status(500).json({ success: false, error });
    }
  });
});
