var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sample");
const controller = require("./db/controller");

// grab the packages we need
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = process.env.PORT || 8080;

// routes will go here
app
  .post("/instance/create", async function(req, res) {
    const urls = req.body.urls;
    if (!urls || !(typeof urls === "array") || !urls.length) {
      return res.send("Please provide some urls");
    }
    const create = await controller.createInstance([...urls]);
    res.send(create);
  })
  .post("/instance/read", async function(req, res) {
    const _id = req.body._id || req.body.id;
    console.log(_id);
    if (!_id || !(typeof _id === "string")) {
      return res.send("Please provide valid _id");
    }
    const read = await controller.readInstance(_id);
    res.send(read);
  })
  .post("/instance/update", async function(req, res) {
    const _id = req.body._id;
    const newData = req.body.newData;
    if (!_id || !(typeof _id === "string") || !newData) {
      return res.send("Please provide valid _id and newData");
    }
    const update = await controller.updateInstance(_id, req.body.newData);
    res.send(update);
  })
  .post("/instance/delete", async function(req, res) {
    const _id = req.body._id;
    if (!_id || !(typeof _id === "string")) {
      return res.send("Please provide valid _id");
    }
    const remove = await controller.removeInstance(_id);
    res.send(remove);
  });

// start the server
var db = mongoose.connection;
db.once("open", function callback() {
  console.log("Database Connected");
  app.listen(port);
  console.log("Server started! At http://localhost:" + port);
});
