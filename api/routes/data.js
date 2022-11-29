const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dataDetails = require("../models/data");

router.post("/add", (req, res, next) => {
  const newData = new dataDetails({
    _id: new mongoose.Types.ObjectId(),
    data: req.body.data,
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
            url: "http://localhost:5000/data",
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
  dataDetails
    .find()
    .select("data  _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        data: docs,
      };
      console.log(docs);

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:Id", (req, res, next) => {
  const id = req.params.Id;
  dataDetails
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
  dataDetails
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

  const { data } = req.body;

  dataDetails.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        data,
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
