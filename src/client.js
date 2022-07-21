var path = require("path")
var PROTO_PATH = path.resolve('src/proto/station.proto');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const config = require('config')

// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

var client = new protoDescriptor.StationService('localhost:6000', grpc.credentials.createInsecure());

var request = {eva: 8002549}

client.getStation(request, function(err, feature) {
    if (err) {
      // process error
      console.error("There has been an error");
      console.error(err);
    } else {
        console.log("Got feature");
      // process feature
      console.log(feature);
    }
  });