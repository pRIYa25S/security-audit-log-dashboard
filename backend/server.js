const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Log = require('./Log'); 

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const MONGO_URI = 'mongodb://priyadhashini122_db_user:Mani25@ac-q7dzw15-shard-00-00.7de9iea.mongodb.net:27017,ac-q7dzw15-shard-00-01.7de9iea.mongodb.net:27017,ac-q7dzw15-shard-00-02.7de9iea.mongodb.net:27017/?ssl=true&replicaSet=atlas-ylf6zk-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(MONGO_URI, {
    family: 4, 
    serverSelectionTimeoutMS: 20000, 
    tls: true,
    tlsAllowInvalidCertificates: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Connection error:', err));

app.post('/api/logs/upload', async (req, res) => {
  try {
    const logs = req.body;
    if (!Array.isArray(logs) || logs.length === 0) {
      return res.status(400).json({ error: 'Payload must be a non-empty array of logs' });
    }
    await Log.insertMany(logs, { ordered: false });
    res.status(201).json({ message: `Successfully uploaded ${logs.length} logs!` });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ error: 'Failed to upload logs' });
  }
});
app.get('/api/logs', async (req, res) => {
  try {
    const { page = 1, limit = 10, severity, status, search, sortBy = 'timestamp', order = 'desc' } = req.query;
    const query = {};
    if (severity) query.severity = severity;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { action: { $regex: search, $options: 'i' } },
        { actor: { $regex: search, $options: 'i' } },
        { resource: { $regex: search, $options: 'i' } }
      ];
    }
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortCriteria = { [sortBy]: sortOrder };

    const logs = await Log.find(query)
      .sort(sortCriteria)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const count = await Log.countDocuments(query);
    res.json({ 
      logs, 
      totalPages: Math.ceil(count / limit), 
      currentPage: Number(page),
      totalLogs: count
    });
  } catch (error) {
    console.error('Fetch logs error:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));