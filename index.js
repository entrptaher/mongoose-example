var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sample");

const controller = require('./db/controller');
async function runTest() {
  const create = await controller.createInstance([
    "https://example.com",
    "https://example.org"
  ]);
  const read = await controller.readInstance(create._id);
  const update = await controller.updateInstance(create._id, { result: "nothing" });
  const remove = await controller.removeInstance(create._id);
  console.log({ create, read, update, remove });
}

runTest();