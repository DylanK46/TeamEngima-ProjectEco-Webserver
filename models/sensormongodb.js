// Import Mongoose Library
var mongoose = require('mongoose');

// Authenticate With MongoDB
var mongoDBURL = 'mongodb+srv://'+process.env['dbuser']+':'+ process.env['dbpass']+'@'+process.env['dbserver']+'/projecteco?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true , useUnifiedTopology: true});

// Error Catch
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Report Active Connection
db.once("open", function() {
  console.log("Connection Successful!");
});

// Declare Data Structure
var DataSchema = new mongoose.Schema({
    "DATE":{type: Date},
    "LOCATION1": {
      "Temperature":{type: Number},
      "Humidity":{type: Number},
      "CO2":{type: Number}
      },
    "LOCATION2": {
      "Temperature":{type: Number},
      "Humidity":{type: Number},
      "CO2":{type: Number}
      }
    } 
);

// Put this data structure into a collection called "sensordata"
var sensordatamodel = mongoose.model("model", DataSchema, "sensordata");

var authtokenmodel = mongoose.model("model", "authtokens");

// ----------------------------------------- //


// FUNCTIONS

  // This one posts data to the DB
exports.postDBdata = (json) => {
  var doc1 = new sensordatamodel({
  "DATE": json["DATE"], 
  "LOCATION1":  json["LOCATION1"],
  "LOCATION2": json["LOCATION2"]
  });
  
  doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });

  return("Success")
};

  // and this one reads it
exports.getDBdata = () => {

  return sensordatamodel.find({}, function(err, result) {
    if (err) {
      return(err);
    } else {
      return(result);
    }
  });
}