var MongoClient = require('mongodb').MongoClient;
const config = require('config')
const url = config.get('database.url')

function findStation(eva) {
    console.log(eva);
    return MongoClient.connect(url, function(err, db) {
        if (err) throw err;
    
        var dbo = db.db("deutsche-bahn");
        var query = { eva: eva };

        dbo.collection("station").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        });
    });
}

module.exports = findStation