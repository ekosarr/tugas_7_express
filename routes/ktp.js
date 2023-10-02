const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
    connection.query("SELECT * FROM ktp order by nik desc", (err, rows) => {
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
    body("nik").notEmpty(), 
    body("nama_lengkap").notEmpty(),
    body("jenis_kelamin").notEmpty(),
    body("tempat_lahir").notEmpty(),
    body("tanggal_lahir").notEmpty(),
    body("agama").notEmpty(),
    body("pendidikan").notEmpty(),
    body("jenis_pekerjaan").notEmpty(),
    body("golongan_darah").notEmpty(),
    body("kewarganegaraan").notEmpty(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    let Data = {
      nik: req.body.nik,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      pendidikan: req.body.pendidikan,
      jenis_pekerjaan: req.body.jenis_pekerjaan,
      golongan_darah: req.body.golongan_darah,
      kewarganegaraan: req.body.kewarganegaraan
    };
    connection.query("insert into ktp set ?", Data, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
          error: err
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "data berhasil dibuat!",
          data: rows[0],
        });
      }
    });
  });

  router.get('/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT * FROM ktp WHERE nik = ?`, [id], function (err, rows) {
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
          message: 'Data KTP',
          data: rows[0]
        });
      }
    });
  });

  router.patch('/update/:id', [
    body('nik').notEmpty(),
    body('nama_lengkap').notEmpty(),
    body('jenis_kelamin').notEmpty(),
    body('tempat_lahir').notEmpty(),
    body('tanggal_lahir').notEmpty(),
    body('agama').notEmpty(),
    body('pendidikan').notEmpty(),
    body('jenis_pekerjaan').notEmpty(),
    body('golongan_darah').notEmpty(),
    body('kewarganegaraan').notEmpty()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nik: req.body.nik,
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan
    };
    
    connection.query('UPDATE ktp SET ? WHERE nik = ?', [Data, id], function (err, rows) {
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
    connection.query(`DELETE FROM ktp WHERE nik = ?`, [id], function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            });
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data berhasil dihapus!'
            });
        }
    });
});



module.exports = router;