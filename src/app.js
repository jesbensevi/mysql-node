const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "node20_mysql",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("database connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/all", (req, res) => {
  const sql = "SELECT * FROM customer";

  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No hay clientes");
    }
  });
  // res.send("list all");
});

app.get("/all/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM customer WHERE ID=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send(`no existe cliente con el id: ${id}`);
    }
  });
});

app.post("/add", (req, res) => {
  const { name, city } = req.body;
  const sql = `INSERT INTO customer (name,city) VALUES ('${name}', '${city}')`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result) {
      res.send("Agregado");
    }
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE customer SET name='${name}', city='${city}' WHERE id=${id}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result) {
      res.json(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customer WHERE id=${id}`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send(`cliente eliminado con el id: ${id}`);
    }
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT} !`));
