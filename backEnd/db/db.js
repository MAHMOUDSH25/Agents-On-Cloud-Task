const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://user:user@cluster0-shard-00-00.fo3dv.mongodb.net:27017,cluster0-shard-00-01.fo3dv.mongodb.net:27017,cluster0-shard-00-02.fo3dv.mongodb.net:27017/WepApp?ssl=true&replicaSet=atlas-11mxv2-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(
    () => {
      console.log("DB connected");
    },
    (err) => {
      console.log(err);
    }
  );
