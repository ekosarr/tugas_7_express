const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const kartu_keluargaRouter = require("./routes/kartu_keluarga");
app.use("/api/kartu_keluarga", kartu_keluargaRouter);

const ktpRouter = require("./routes/ktp");
app.use("/api/ktp", ktpRouter);

const detail_kkRouter = require("./routes/dkk");
app.use("/api/detail_kk", detail_kkRouter);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
