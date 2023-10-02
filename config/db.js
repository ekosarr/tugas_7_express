const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "07_express_latihan"
});

connection.connect(function (error) {
    if (!error) {
        console.log("berhasil terkoneksi");
    }else{
        console.log("gagal terkoneksi");
    }
});

module.exports = connection;