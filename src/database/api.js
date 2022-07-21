var MongoClient = require('mongodb').MongoClient;
const config = require('config')
const url = config.get('database.url')

function findStation(eva, callback) {
    console.log(eva);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
    
        var dbo = db.db("deutsche-bahn");
        var query = { eva: Number(eva) };

        dbo.collection("station").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(`Found ${result} for ${eva}`);
            callback(null, result[0]);
            db.close();
        });
    });
}

module.exports = findStation