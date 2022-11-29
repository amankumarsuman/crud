const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  data: {
    type: String,
  },
  
});

const dataDetail = mongoose.model("AuditDetail", dataSchema);
module.exports = dataDetail;
