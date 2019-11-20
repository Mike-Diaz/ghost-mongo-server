const Organization = require("../models/Organization");
const mongoose = require("mongoose");

exports.getAll = (req, res) => {
  Organization.find({}).sort({createdOn: 'asc'}).exec((err, organization) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(organization);
    console.log(`Organization from Node: ${organization}`);
  });
};

exports.getById = (req, res) => {
  Organization.findById(req.params.organizationId, (err, organization) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(organization);
  });
};

exports.new = (req, res) => {
  let newOrganization = new Organization(req.body);
  console.log(newOrganization);
  newOrganization.save((err, organization) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(organization);
  });
};

exports.update = (req, res) => {
  console.log('organizationId at server is ' + req.params.organizationId);
  Organization.findOneAndUpdate(
    { _id: req.params.organizationId },
    req.body,
    { new: false },
    (err, organization) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log(organization);
      res.status(200).json(organization);
    }
  );
};

exports.delete = (req, res) => {
  Organization.remove({ _id: req.params.organizationId }, (err, organization) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Organization successfully deleted" });
  });
};