const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

exports.getAll = (req, res) => {
  Vehicle.find({}, (err, vehicle) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(vehicle);
    console.log(`Vehicle from Node: ${vehicle}`);
  });
};

exports.getById = (req, res) => {
  Vehicle.findById(req.params.vehicleId, (err, vehicle) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(vehicle);
  });
};

exports.new = (req, res) => {
  let newVehicle = new Vehicle(req.body);
  console.log(newVehicle);
  newVehicle.save((err, vehicle) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(vehicle);
  });
};

exports.update = (req, res) => {
  console.log('vehicleId at server is ' + req.params.vehicleId);
  Vehicle.findOneAndUpdate(
    { _id: req.params.vehicleId },
    req.body,
    { new: false },
    (err, vehicle) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log(vehicle);
      res.status(200).json(vehicle);
    }
  );
};

exports.delete = (req, res) => {
  Vehicle.remove({ _id: req.params.vehicleId }, (err, vehicle) => {  // don't know who changed the name from _id
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Vehicle successfully deleted" });
  });
};