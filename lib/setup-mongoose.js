const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/budget-tracker-api';

mongoose.Promise = Promise;
mongoose.connect(dbURI, { useMongoClient: true });
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' +  dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' +  err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app');
        process.exit(0);
    });
});

module.exports = mongoose.connection;