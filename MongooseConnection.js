const mongoose = require('mongoose');

exports.connectToMongoDb = function() {
    mongoose.connect(process.env.MONGO_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).catch((err) => {
        console.log('Failed to connect to mongo on startup - retrying in 5 sec');
        setTimeout(connectWithRetry, 1000);
    });
    mongoose.connection.once('open', () => {
        console.log('connected to mongo db')
    })
}