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


router.post('/addTask', (req, res) => {
  var sql = $sql.task.add;
  var params = JSON.parse(req.body.body);
  conn.query(sql, [params.title, params.description, params.tag, params.owner], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/getAllTaskDatas', (req, res) => {
    var sql = $sql.task.getAllTasks;
    var params = JSON.parse(req.body.body);
    conn.query(sql, [params.authOwner], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        jsonWrite(res, result);
      }
    })
  })

  router.post('/deleteTaskDatas', (req, res) => {
    var sql = $sql.task.deleteTaskDatas;
    var params = JSON.parse(req.body.body);
    conn.query(sql, [params.selected], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        jsonWrite(res, result);
      }
    })
  })

  router.post('/editTask', (req, res) => {
    var sql = $sql.task.editTask;
    var params = JSON.parse(req.body.body);
    conn.query(sql, [ params.title, params.description, params.tag, params.id ], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        jsonWrite(res, result);
      }
    })
  })

  router.post('/inputSearch', (req, res) => {
    var sql = $sql.task.inputSearch;
    var params = JSON.parse(req.body.body);
    // console.log(params.inputkey);
    conn.query(sql, [ params.authOwner ], function(err, result) {
      if (err) {
        console.log(err);
      } else {
          var filteredResult = [];
          for(let i=0;i<result.length;i++) {
            // console.log(result[i].tags.split(" ,"));
              if (result[i].title.includes(params.inputkey) || result[i].description.includes(params.inputkey) || result[i].tags.split(", ").includes(params.inputkey)) {
                filteredResult.push(result[i]);
              }
          }

          console.log(filteredResult);
        jsonWrite(res, filteredResult);
      }
    })
  })

  router.post('/setStatus', (req, res) => {
    var sql = $sql.task.setStatus;
    var params = JSON.parse(req.body.body);
    conn.query(sql, [ params.taskStatus, params.id ], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        jsonWrite(res, result);
      }
    })
  })

  router.post('/setWillEditData', (req, res) => {
    var sql = $sql.task.setWillEditData;
    var params = JSON.parse(req.body.body);
    conn.query(sql, [ params.willEditDataId ], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        jsonWrite(res, result);
      }
    })
  })

module.exports = router; 
