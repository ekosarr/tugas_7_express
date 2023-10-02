const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("SELECT * FROM kartu_keluarga order by no_kk desc", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Sukses.. !",
        data: rows,
      });
    }
  });
});

router.post("/add", [
  body("no_kk").notEmpty(), 
  body("alamat").notEmpty(),
  body("rt").notEmpty(),
  body("rw").notEmpty(),
  body("kode_pos").notEmpty(),
  body("desa_kelurahan").notEmpty(),
  body("kecamatan").notEmpty(),
  body("kabupaten_kota").notEmpty(),
  body("provinsi").notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  let Data = {
    no_kk: req.body.no_kk,
    alamat: req.body.alamat,
    rt: req.body.rt,
    rw: req.body.rw,
    kode_pos: req.body.kode_pos,
    desa_kelurahan: req.body.desa_kelurahan,
    kecamatan: req.body.kecamatan,
    kabupaten_kota: req.body.kabupaten_kota,
    provinsi: req.body.provinsi
  };
  connection.query("insert into kartu_keluarga set ?", Data, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Error",
        error: err
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Success!",
        data: rows[0],
      });
    }
  });
});

router.get('/:id', function (req, res) {
  let id = req.params.id;
  connection.query(`SELECT * FROM kartu_keluarga WHERE no_kk = ?`, [id], function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error'
      });
    }
    if (rows.length === 0) { // Perbaiki kondisi ini (dari "=>" menjadi "==")
      return res.status(404).json({
        status: false,
        message: 'Not Found'
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Keluarga',
        data: rows[0]
      });
    }
  });
});

router.patch('/update/:id', [
  body('no_kk').notEmpty(),
  body('alamat').notEmpty(),
  body('rt').notEmpty(),
  body('rw').notEmpty(),
  body('kode_pos').notEmpty(),
  body('desa_kelurahan').notEmpty(),
  body('kecamatan').notEmpty(),
  body('kabupaten_kota').notEmpty(),
  body('provinsi').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  let id = req.params.id;
  let Data = {
      no_kk: req.body.no_kk,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      kode_pos: req.body.kode_pos,
      desa_kelurahan: req.body.desa_kelurahan,
      kecamatan: req.body.kecamatan,
      kabupaten_kota: req.body.kabupaten_kota,
      provinsi: req.body.provinsi
  };
  
  connection.query('UPDATE kartu_keluarga SET ? WHERE no_kk = ?', [Data, id], function (err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Server Error'
          });
      } else {
          return res.status(200).json({
              status: true,
              message: 'Update Success..!'
          });
      }
  });
});

router.delete('/delete/(:id)', function(req, res) {
  let id = req.params.id;
  connection.query(`DELETE FROM kartu_keluarga WHERE no_kk = ?`, [id], function(err, rows) {
      if(err){
          return res.status(500).json({
              status: false,
              message: 'Server Error'
          });
      }else{
          return res.status(200).json({
              status: true,
              message: 'Data has been deleted!'
          });
      }
  });
});






module.exports = router;
