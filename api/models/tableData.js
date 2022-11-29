const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  lname: {
    type: String,
  },
  mobile: {
    type: Number,
  },
});

const tableDetail = mongoose.model("TableDetail", tableSchema);
module.exports = tableDetail;
