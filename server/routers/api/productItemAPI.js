const express = require("express");
const mysql = require("mysql");

const cpp = require("../../controllers/productPage/changeProductItem");
const hsp = require("../../controllers/ctrlHdSelProd.js");
const Setting = require("../../config/config");

var router = express.Router();
let conn = mysql.createConnection(Setting.db_setting);

function queryDatabase(sql, params) {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

router.get("/", (req, res) => {
  cpp.changeProduct(req, res);
  //res string
});

//product comparison
router.get("/prodComparison", async (req, res) => {
  try {
    let prodId = req.query.prod_id;
    let specId = req.query.spec_id;
    let specProdData = await queryDatabase(
      "SELECT * FROM vw_products_detail WHERE prod_id = ? AND spec_id = ?",
      [prodId, specId]
    );
    res.send(specProdData);
  } catch (err) {
    console.error(err);
  }
});

//header select tool
router.get("/search", (req, res) => {
  hsp.herderSelProd(req, res);
});

module.exports = router;
