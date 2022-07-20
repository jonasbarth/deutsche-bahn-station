var path = require("path")
var PROTO_PATH = path.resolve('src/proto/station.proto');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const findStation = require('./database/api');
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
var StationService = protoDescriptor.StationService;

var stationServer = new grpc.Server();

stationServer.addService(StationService.service, {
    getStation: getStation,
});

/**
 * getFeature request handler. Gets a request with a point, and responds with a
 * feature object indicating whether there is a feature at that point.
 * @param {EventEmitter} call Call object for the handler to process
 * @param {function(Error, feature)} callback Response callback
 */
function getStation(call, callback) {
    callback(null, findStation(call.request.eva));
}

stationServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    stationServer.start();
});
