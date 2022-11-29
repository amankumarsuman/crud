const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const tableDetails = require("../models/tableData");

router.post("/add", (req, res, next) => {
  const newData = new tableDetails({
    _id: new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    mobile: req.body.mobile,
  });
  newData
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Data Added successfully",
        dataAdded: {
          _id: result.id,
          data: result.data,

          //sending request is optional
          request: {
            type: "GET",
            url: "http://localhost:5000/table",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res, next) => {
  tableDetails
    .find()
    .select("fname lname mobile  _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        data: docs,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:Id", (req, res, next) => {
  const id = req.params.Id;
  tableDetails
    .findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status.apply(404).json({ message: " no valid id matched" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:Id", (req, res, next) => {
  tableDetails
    .deleteOne({ _id: req.params.Id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "data deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:Id", (req, res, next) => {
  const id = req.params.Id;

  const { fname, lname, mobile } = req.body;

  tableDetails.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        fname,
        lname,
        mobile,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (data === null) {
          res.send("No data present with this ID");
        } else {
          res.send({ msg: " Data Updated Successfully", data: data });
        }
      }
    }
  );
});
module.exports = router;
