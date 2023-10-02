const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
    connection.query("SELECT * FROM detail_kk order by id_detail desc", (err, rows) => {
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
    body("nik").notEmpty(),
    body("status_hubungan_dalam_keluarga").notEmpty(),
    body("ayah").notEmpty(),
    body("ibu").notEmpty(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    let Data = {
      no_kk: req.body.no_kk,
      nik: req.body.nik,
      status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga,
      ayah: req.body.ayah,
      ibu: req.body.ibu,
    };
    connection.query("INSERT INTO detail_kk SET ?", Data, function (err, rows) {
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

  router.get('/:no_kk', function (req, res) {
    let no_kk = req.params.no_kk;
  
    // Query SQL untuk mengambil detail keluarga berdasarkan nomor KK
    const sqlQuery = `
      SELECT
        a.no_kk,
        c.nama_lengkap,
        a.status_hubungan_dalam_keluarga as status_dalam_hubungan,
        d.nama_lengkap as ayah,
        e.nama_lengkap as ibu
      FROM detail_kk a
      INNER JOIN kartu_keluarga b ON b.no_kk = a.no_kk
      INNER JOIN ktp c ON c.nik = a.nik
      INNER JOIN ktp d ON d.nik = a.ayah
      INNER JOIN ktp e ON e.nik = a.ibu
      WHERE b.no_kk = ?
    `;
  
    // Jalankan query dengan parameter no_kk
    connection.query(sqlQuery, [no_kk], function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Server Error'
        });
      }
      if (rows.length === 0) {
        return res.status(404).json({
          status: false,
          message: 'Not Found'
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Detail Keluarga',
          data: rows
        });
      }
    });
  });
  
  
  

  module.exports = router;