var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失敗'
    });
  } else {
    res.json(ret);
  }
}

router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = JSON.parse(req.body.body);
  console.log(params);
  conn.query(sql, [params.email, params.username, params.password], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/authenticate', (req, res) => {
  var sql = $sql.user.login;
  var params = JSON.parse(req.body.body);
  console.log(params);
  conn.query(sql, [params.email, params.password], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})
module.exports = router;
