import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

interface DiagnosticLog {
  timestamp: string;
  vehicleId: string;
  code: string;
  message: string;
}

let logs: DiagnosticLog[] = [];

const parseLogsFromFile = (filePath: string) => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  logs = [];

  for (const line of lines) {
    const match = line.match(/\[(.*?)\] \[VEHICLE_ID:(.*?)\] \[.*?\] \[CODE:(.*?)\] \[(.*?)\]/);
    if (match) {
      const [, timestamp, vehicleId, code, message] = match;
      logs.push({ timestamp, vehicleId, code, message });
    }
  }
};

parseLogsFromFile(path.join(__dirname, 'diagnostic.log'));

app.get('/logs', (req, res) => {
  const { vehicle, code } = req.query;
  const from = req.query.from as string;
  const to = req.query.to as string;

  let filteredLogs = logs;

  if (vehicle) {
    filteredLogs = filteredLogs.filter(log => log.vehicleId === vehicle);
  }

  if (code) {
    filteredLogs = filteredLogs.filter(log => log.code === code);
  }

  if (from) {
    filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(from));
  }

  if (to) {
    filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(to));
  }

  res.json(filteredLogs);
});




app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
