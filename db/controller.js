const Instance = require("./Instance");

async function createInstance(urls) {
  const instance = new Instance({
    input: [...urls]
  });
  return instance.save();
}

async function readInstance(_id) {
  return Instance.find({ _id });
}

async function updateInstance(_id, newData) {
  return Instance.findOneAndUpdate({ _id }, newData, {
    upsert: true,
    new: true
  });
}

async function removeInstance(_id) {
  return Instance.findByIdAndRemove(_id);
}

module.exports = {
  createInstance,
  readInstance,
  updateInstance,
  removeInstance
};
