var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var InstanceSchema = new Schema({
  input: [String],
  result: {},
  status: {
    running: String
  },
  expire_at: { type: Date, default: Date.now, expires: 7200 } // expire after 2 hours
});

const Instance = mongoose.model("Instance", InstanceSchema);

module.exports = Instance;