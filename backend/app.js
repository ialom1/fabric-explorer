const express = require("express");
const bodyParser = require('body-parser');
const make_query = require('./Fabric/queries.js')
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/blocks", (req, res, next) => {
  Promise.resolve(
    make_query.get_blocks_height()
  ).then((height) => {
    let num = height.height;
    Promise.all([
      make_query.get_block(num-1),
      make_query.get_block(num-2),
      make_query.get_block(num-3)
    ]).then((blocks) => {
      res.status(200).json({
        message: "The blocks were fetched successfully",
        blocks: blocks
      });
    });
  });
});

app.get("/api/headline", (req, res, next) => {
  Promise.all([
    make_query.get_blocks_height(),
    make_query.get_peers_list(),
    make_query.get_chaincodes_list()
  ]).then((headline) => {
    res.status(200).json({
      message: "The blocks were fetched successfully",
      headline: headline
    });
  });
});

app.get("/api/trnxn/:trnxnid", (req, res, next) => {
  Promise.resolve(
    make_query.get_trnxn_block(req.params.trnxnid),
  ).then((block) => {
    res.status(200).json({
      message: "The block was fetched successfully",
      block: block
    })
  });
});

module.exports = app;
