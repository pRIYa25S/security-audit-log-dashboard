const mongoose = require('mongoose');
const Log = require('./Log'); 

const MONGO_URI = 'mongodb://priyadhashini122_db_user:Mani25@ac-q7dzw15-shard-00-00.7de9iea.mongodb.net:27017,ac-q7dzw15-shard-00-01.7de9iea.mongodb.net:27017,ac-q7dzw15-shard-00-02.7de9iea.mongodb.net:27017/?ssl=true&replicaSet=atlas-ylf6zk-shard-0&authSource=admin&appName=Cluster0';

const sampleLogs = [
  { severity: "INFO", action: "User Login", status: "SUCCESS" },
  { severity: "WARNING", action: "High Memory Usage", status: "PENDING" },
  { severity: "ERROR", action: "Database Connection Timeout", status: "FAILED" },
  { severity: "INFO", action: "Profile Updated", status: "SUCCESS" },
  { severity: "ERROR", action: "Unauthorized Access Attempt", status: "FAILED" },
  { severity: "WARNING", action: "Deprecated API Called", status: "SUCCESS" },
  { severity: "INFO", action: "File Upload", status: "SUCCESS" },
  { severity: "ERROR", action: "Payment Gateway Error", status: "FAILED" },
  { severity: "WARNING", action: "Low Disk Space", status: "PENDING" },
  { severity: "INFO", action: "Password Reset", status: "SUCCESS" },
  { severity: "INFO", action: "User Logout", status: "SUCCESS" }
];

mongoose.connect(MONGO_URI, {
    family: 4, 
    serverSelectionTimeoutMS: 20000, 
    tls: true,
    tlsAllowInvalidCertificates: true
})
.then(async () => {
    console.log('Connected to MongoDB for seeding...');
    await Log.insertMany(sampleLogs);
    console.log('Successfully inserted sample logs!');
    await mongoose.disconnect();
})
.catch(err => {
    console.error('Seeding failed:', err);
});