const mysql = require("mysql2/promise");

const db = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "P@ssw0rd",
  database: "cefetmoney",
};

const createConnection = async () => {
  return await mysql.createConnection(db);
};

module.exports = createConnection;
