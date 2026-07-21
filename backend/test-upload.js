const mongoose = require('mongoose');
const Log = require('./Log'); 
const MONGO_URI = 'mongodb://priyadhashini122_db_user:Mani25@ac-q7dzw15-shard-00-00.7de9iea.mongodb.net:27017,ac-q7dzw15-shard-00-01.7de9iea.mongodb.net:27017,ac-q7dzw15-shard-00-02.7de9iea.mongodb.net:27017/?ssl=true&replicaSet=atlas-ylf6zk-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(MONGO_URI, {
    family: 4, 
    serverSelectionTimeoutMS: 20000, 
    tls: true,
    tlsAllowInvalidCertificates: true
})
.then(async () => {
    console.log('Successfully connected to MongoDB');
    const newLog = new Log({
        severity: "INFO",
        action: "User Login",
        status: "SUCCESS"
    });
    await newLog.save();
    console.log('Log uploaded successfully!');
    await mongoose.disconnect();
})
.catch(err => {
    console.error('Connection failed. Full error details:');
    console.error(err);
});